
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqWgxIKjLYj5Y_Ny_vKrd8hDUPeX_Tkf0",
  authDomain: "instagram-clone-a3315.firebaseapp.com",
  databaseURL: "https://instagram-clone-a3315-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "instagram-clone-a3315",
  storageBucket: "instagram-clone-a3315.appspot.com",
  messagingSenderId: "5961422148",
  appId: "1:5961422148:web:d719cb807dcaa646d0f311",
  measurementId: "G-2GSZ3JXTQR"
};
export default firebaseConfig

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

