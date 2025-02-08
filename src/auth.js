import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase';

// Sign up function
export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created successfully!");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

// Log in function
export const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in successfully!");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// Log out function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
