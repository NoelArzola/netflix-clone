import React from "react";
import "./Plan.css";

function Plan({ name, quality, planURL }) {
  return (
    <div className="plan__container">
      <div className="plan__description">
        <h4>{name}</h4>
        <p>{quality}</p>
      </div>
      <a href={planURL} className="plan__button">
        Subscribe
      </a>
    </div>
  );
}

export default Plan;
