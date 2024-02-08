import React, { useRef } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./SignUpScreen.css";

interface SignUpScreenProps {
  getStartedEmailRef: React.RefObject<HTMLInputElement>;
}

function SignUpScreen({ getStartedEmailRef }: SignUpScreenProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useNavigate();

  const register = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .then(() => history("/profile", { replace: true }))
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) return;

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
            getStartedEmailRef?.current?.value
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
          {/* @ts-ignore*/}
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
