// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYd0WHvAJrMeYQxaGNVsnVPQHOx59zlJ8",
  authDomain: "prg09-app.firebaseapp.com",
  projectId: "prg09-app",
  storageBucket: "prg09-app.appspot.com",
  messagingSenderId: "481246050162",
  appId: "1:481246050162:web:0631e8e45284907c85cfeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export { app } 