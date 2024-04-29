// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogitup-3eb7f.firebaseapp.com",
  projectId: "blogitup-3eb7f",
  storageBucket: "blogitup-3eb7f.appspot.com",
  messagingSenderId: "715071068738",
  appId: "1:715071068738:web:f36f3b3370a5fc6486abdb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);