import React, { useState, useRef } from "react";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const getStartedEmailRef = useRef(null);
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png"
          alt="Netflix logo"
          className="loginScreen__logo"
        />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className="loginScreen__gradient"></div>
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignUpScreen getStartedEmailRef={getStartedEmailRef} />
        ) : (
          <>
            <h1>Unlimited films, TV programs, and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to Watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginScreen__input">
              <form action="">
                <input
                  type="email"
                  placeholder="Email address"
                  name=""
                  id=""
                  ref={getStartedEmailRef}
                />
                <button
                  className="loginScreen__getStarted"
                  onClick={() => setSignIn(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
