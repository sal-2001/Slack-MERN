import React, { useEffect, useState } from "react";
import "../styles/topbar.css";
import useStateValue from "../context/AppContext";
import Profile from "./Profile";

function TopBar() {
  const [{ user }, _] = useStateValue();
  const [openProfile, setOpenProfile] = useState(false);
  
  const closeProfile = () => {
    setOpenProfile(false);
  };
  return (
    <header className="topBar">
      <h2>My Chat</h2>
      <div className="userContainer" onClick={() => setOpenProfile(true)}>
        <img src={user.photo} className="userImage" />
      </div>
      {openProfile && <Profile closeProfile={closeProfile} />}
    </header>
  );
}

export default TopBar;
