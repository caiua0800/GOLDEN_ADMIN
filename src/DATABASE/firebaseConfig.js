// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS2YwOCmnJKF4AgnjEqB0Huy2146YitII",
  authDomain: "golden-token-62a99.firebaseapp.com",
  projectId: "golden-token-62a99",
  storageBucket: "golden-token-62a99.appspot.com",
  messagingSenderId: "819750858832",
  appId: "1:819750858832:web:6d331de11d2dc5750a6155",
  measurementId: "G-YY52V2CG6N"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };
