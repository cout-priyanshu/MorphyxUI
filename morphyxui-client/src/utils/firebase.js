// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "virtualui-4356e.firebaseapp.com",
  projectId: "virtualui-4356e",
  storageBucket: "virtualui-4356e.firebasestorage.app",
  messagingSenderId: "108670604786",
  appId: "1:108670604786:web:ca9d65bf13e1d96389c76b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}