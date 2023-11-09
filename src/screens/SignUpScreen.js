import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";

function SignUpScreen({ getStartedEmailRef }) {
  console.log(getStartedEmailRef.current);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signUpScreen">
      <form action="">
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          defaultValue={
            getStartedEmailRef.current.value
              ? getStartedEmailRef.current.value
              : ""
          }
        />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span>New to Netflix? Fill out the form above then</span>{" "}
          <span className="signUpScreen__link" onClick={register}>
            click here to Sign Up Now.
          </span>{" "}
          <span> (Use made up credentials!)</span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
