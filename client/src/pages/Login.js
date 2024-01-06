import React, { useState } from "react";
import "../styles/login.css";
import chat_image from "../assets/chatting_illustration.jpg";
import { useNavigate } from "react-router-dom";
import { isValid } from "../utils/register";

const freshData = {
  username: "",
  name: "",
  password: "",
};

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState(freshData);
  const navigate = useNavigate();

  const updater = (field, value) => {
    const temp = { ...data };
    temp[field] = value;
    setData(temp);
  };
  const submit = () => {
    if (!isValid(data, isLogin)) return;
    console.log("data=>", data);
    navigate("/chat");
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
          type="text"
          id="username"
          placeholder="Username..."
          value={data.username}
          onChange={(e) => updater("username", e.target.value)}
        />
      </div>
      {!isLogin && (
        <div className="text_field">
          {/* <label htmlFor="name">Name : </label> */}
          <input
            type="text"
            id="=name"
            placeholder="Your full name..."
            value={data.name}
            onChange={(e) => updater("name", e.target.value)}
          />
        </div>
      )}
      <div className="text_field">
        {/* <label htmlFor="password1">Password : </label> */}
        <input
          type="text"
          id="password1"
          placeholder="Password..."
          value={data.password}
          onChange={(e) => updater("password", e.target.value)}
        />
      </div>
    </div>
  );
};
