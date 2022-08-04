import React, { useEffect, useState } from "react";
import "./Plans.css";
import db from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function Plans() {
  //TODO: Cancel button, Restrict Access, Populate renewal date and current plan dynamically
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const [currentPlan, setCurrentPlan] = useState("None");

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}. Please try again`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_3e0ixkUM0GkeLQ44AxWTXESQ00jsrkAhFw"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  useEffect(() => {
    db.collection("customers")
      .doc(`${user.uid}`)
      .collection("subscriptions")
      .where("status", "==", "active")
      .onSnapshot(async (snapshot) => {
        if (snapshot.empty) {
          // Show products
          console.log("empty");
          return;
        }
        const subscription1 = snapshot.docs[0].data();
        let roleData = await subscription1.role;
        roleData = roleData[0].toUpperCase() + roleData.substring(1);
        setCurrentPlan(roleData);
      });
  });

  return (
    <div className="plans__wrapper">
      <h3>Plans (Current Plan: {currentPlan})</h3>
      <p className="plan__renewal-date">Renew Date: {}</p>
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div className="plan__container" key={productId}>
            <div className="plan__description">
              <h4>{productData.name}</h4>
              <p>{productData.description}</p>
            </div>
            <button
              className={`plan__button ${
                isCurrentPackage && "plan__button--disabled"
              }`}
              onClick={() => loadCheckout(productData.prices.priceId)}
            >
              {isCurrentPackage ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
