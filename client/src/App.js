import React from "react";
import "./styles/App.css";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const baseUrl = process.env.REACT_APP_BASE_URL;

const socket = io(baseUrl);

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
