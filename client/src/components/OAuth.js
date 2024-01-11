import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import "../styles/login.css";
import { googleSignIn } from "../services/user";
import useStateValue from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { addUser } from "../context/actions/register";

export default function OAuth() {
  const navigate = useNavigate();
  const [_, dispatch] = useStateValue();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log('avatar',result.user.photoURL);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };
      googleSignIn(userData)
        .then((data) => {
          localStorage.setItem("token", data.token);
          addUser(dispatch, data);
        })
        .then(() => navigate("/chat"))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Could not signin with google!", error);
    }
  };
  return (
    <button className="login_button google" onClick={handleGoogleClick}>
      Continue with Google
    </button>
  );
}
