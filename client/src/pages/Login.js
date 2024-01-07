import React, { useState } from "react";
import "../styles/login.css";
import chat_image from "../assets/chatting_illustration.jpg";
import { useNavigate } from "react-router-dom";
import { isValid } from "../utils/register";
import axios from "axios";
import { signUpUser, signInUser } from "../services/user";
import OAuth from "../components/OAuth";
import useStateValue from "../context/AppContext";
import { addUser } from "../context/actions/register";

const freshData = {
  name: "",
  email: "",
  password: "",
  phone: "",
  photo: "",
};

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState(freshData);
  const [_, dispatch] = useStateValue();
  const navigate = useNavigate();

  const updater = (field, value) => {
    const temp = { ...data };
    temp[field] = value;
    setData(temp);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const userData = { email: data.email, password: data.password };
      signInUser(userData)
        .then((data) => {
          addUser(dispatch, {
            name: data.name,
            email: data.email,
            phone: data?.phone,
            photo: data.avatar,
          });
          navigate("/chat");
        })
        .catch((error) => console.log(error));
    } else {
      signUpUser(data)
        .then((data) => {
          console.log("data", data);
          addUser(dispatch, {
            name: data.name,
            email: data.email,
            phone: data?.phone,
            photo: data.avatar,
          });
          navigate("/chat");
        })
        .catch((error) => console.log(error));
    }
  };
  const changeMode = () => {
    setIsLogin((flag) => !flag);
    setData(freshData);
  };

  return (
    <div className="login_page">
      <div className="left_half">
        <img src={chat_image} alt="two_person_chatting_image" />
      </div>
      <div className="right_half center_content">
        <div className="login_title">
          <h2>Welcome to MyChat!</h2>
        </div>
        <div className="login_box">
          <RegisterFields updater={updater} data={data} isLogin={isLogin} />
          <button className="login_button" onClick={submit}>
            Start Chat
          </button>
          <OAuth />
        </div>
        <div style={{ marginTop: "10px" }}>
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <span onClick={changeMode} className="pointer modechanger">
                Signup
              </span>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <span onClick={changeMode} className="pointer modechanger">
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

const RegisterFields = ({ updater, data, isLogin }) => {
  return (
    <div>
      <h2 className="login_title">{isLogin ? "Login" : "Signup"}</h2>
      <div className="text_field">
        {/* <label htmlFor="username">Username : </label> */}
        <input
          type="email"
          id="email"
          placeholder="Email..."
          value={data.email}
          onChange={(e) => updater("email", e.target.value)}
        />
      </div>
      {!isLogin && (
        <div className="text_field">
          {/* <label htmlFor="name">Name : </label> */}
          <input
            type="text"
            id="name"
            placeholder="Your full name..."
            value={data.name}
            onChange={(e) => updater("name", e.target.value)}
          />
        </div>
      )}
      {!isLogin && (
        <div className="text_field">
          {/* <label htmlFor="name">Name : </label> */}
          <input
            type="text"
            id="phone"
            placeholder="Phone numer..."
            value={data.phone}
            onChange={(e) => updater("phone", e.target.value)}
          />
        </div>
      )}
      <div className="text_field">
        {/* <label htmlFor="password1">Password : </label> */}
        <input
          type="password"
          id="password"
          placeholder="Password..."
          value={data.password}
          onChange={(e) => updater("password", e.target.value)}
        />
      </div>
    </div>
  );
};
