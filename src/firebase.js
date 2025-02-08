// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3vi3U9MnLWBdX5dnKKQwkejIJRNxL-cg",
  authDomain: "login-1ab61.firebaseapp.com",
  projectId: "login-1ab61",
  storageBucket: "login-1ab61.appspot.com",
  messagingSenderId: "710820628133",
  appId: "1:710820628133:web:f9ab32af7c945621f7af4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);