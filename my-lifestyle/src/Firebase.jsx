import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDHsCdniVeCwqo76QV9h23FyNYxDSvKNQ",
  authDomain: "gym-tracker-4a040.firebaseapp.com",
  projectId: "gym-tracker-4a040",
  storageBucket: "gym-tracker-4a040.firebasestorage.app",
  messagingSenderId: "535377986676",
  appId: "1:535377986676:web:216afba830477431e0bd21",
  measurementId: "G-HRNY3REMSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };