import "./Profile.css";
import Nav from "../Nav";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Plan from "../Plan";

function Profile() {
  const user = useSelector(selectUser);
  const user_plan = "Premium";
  const user_renewal_date = "10/04/2016";
  const plans = [
    {
      name: "Netflix Standard",
      quality: "1080p",
      planUrl: "https://www.noelarzola.com",
    },
    {
      name: "Netflix Basic",
      quality: "480p",
      planUrl: "https://www.noelarzola.com",
    },
    {
      name: "Netflix Premium",
      quality: "4k + HDR",
      planUrl: "https://www.noelarzola.com",
    },
  ];
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans (Current Plan: {user_plan})</h3>
              <p>Renew Date: {user_renewal_date}</p>
              <div>
                {plans.map((plan) => (
                  <Plan
                    name={plan.name}
                    quality={plan.quality}
                    planURL={plan.planURL}
                  />
                ))}
              </div>
              <button
                onClick={() => auth.signOut}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
