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
  const [renewalDate, setRenewalDate] = useState("N/A");
  const [showLoading, setShowloading] = useState(false);

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
        const roleData = snapshot.docs[0].data();
        let planName = await roleData.role;
        planName = planName[0].toUpperCase() + planName.substring(1);
        setCurrentPlan(planName);
        const currentPeriodEnd = subscription.current_period_end;
        if (currentPeriodEnd) {
          let transformEpoch = new Date(currentPeriodEnd * 1000);
          transformEpoch = transformEpoch.toLocaleDateString();
          setRenewalDate(transformEpoch);
        }
      });
  });

  return (
    <div className="plans__wrapper">
      <h3>Plans (Current Plan: {currentPlan})</h3>
      <p className="plan__renewal-date">Renew Date: {renewalDate}</p>
      {!subscription ? (
        <p className="plan__card_info">
          <span className={"font-bold"}>
            On the next screen (Stripe Checkout) the test card to enter is:
          </span>{" "}
          4242 4242 4242 4242 <span className={"font-bold"}>CVC:</span> 424{" "}
          <span className={"font-bold"}>ZIP:</span> 42424
        </p>
      ) : (
        ""
      )}
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
              } ${showLoading && "pointer-none"}`}
              onClick={() => {
                setShowloading(true);
                loadCheckout(productData.prices.priceId);
              }}
              disabled={showLoading}
            >
              <span className={showLoading ? "hidden" : "block"}>
                {isCurrentPackage ? "Current Plan" : "Subscribe"}
              </span>
              <span className={showLoading ? "block animate-spin" : "hidden"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  style={{ fill: "#ffffff" }}
                >
                  <path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z" />
                </svg>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
