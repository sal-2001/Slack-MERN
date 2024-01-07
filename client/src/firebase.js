// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASWZi29S4dNi8LEqcGEWqCuRny1PgbEko",
  authDomain: "slack-mern-sss.firebaseapp.com",
  projectId: "slack-mern-sss",
  storageBucket: "slack-mern-sss.appspot.com",
  messagingSenderId: "322473001178",
  appId: "1:322473001178:web:cc315711f0d594ed8825e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);