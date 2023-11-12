import React, { useEffect } from "react";
import "./App.css";
import Homescreen from "./screens/Homescreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Profile from "./screens/Profile";
import MoreInfo from "./screens/MoreInfo";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/title" element={<MoreInfo />} />
            <Route path="/profile" element={<Profile />} />
            <Route exact path="/" element={<Homescreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
