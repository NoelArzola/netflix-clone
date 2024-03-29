import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const API_KEY = process.env.REACT_APP_GFB_API_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "netflix-152b6.firebaseapp.com",
  projectId: "netflix-152b6",
  storageBucket: "netflix-152b6.appspot.com",
  messagingSenderId: "628913962186",
  appId: "1:628913962186:web:c09e16742397d435db4833",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();

export { auth };
export default db;
