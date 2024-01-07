import React from "react";
import "./styles/App.css";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<PrivateRoute />}> */}
            <Route path="/chat" element={<Chat />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
