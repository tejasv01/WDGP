import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCB__z_304OzXRCrFS8EJDeAIQ_9-c7108",
  authDomain: "wdgp-50cbe.firebaseapp.com",
  projectId: "wdgp-50cbe",
  storageBucket: "wdgp-50cbe.firebasestorage.app",
  messagingSenderId: "910223938807",
  appId: "1:910223938807:web:2a5e20ae07adea2d17aff2",
  measurementId: "G-VS96ZTEXNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
