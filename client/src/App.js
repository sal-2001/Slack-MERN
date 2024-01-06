import React from "react";
import "./styles/App.css";
// import Chat from "./Pages/chat/index";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import io from "socket.io-client";

// const baseUrl = process.env.REACT_APP_BASEURL;

// const socket = io(baseUrl);

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
{
  /* <Route path="/chat" element={<Chat socket={socket} />} /> */
}

export default App;
