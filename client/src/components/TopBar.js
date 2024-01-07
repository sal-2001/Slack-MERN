import React, { useState } from "react";
import "../styles/topbar.css";
import useStateValue from '../context/AppContext'
import Profile from "./Profile";
function TopBar() {
  const [{user}, dispatch] = useStateValue();
  const [openProfile, setOpenProfile] = useState(true);
  return <header className="topBar">
    <h2>My Chat</h2>
    <div className="userContainer" >
        <img src={user.photo} className="userImage"/>
    </div>
    {
      openProfile && <Profile/>
    }
  </header>;
}

export default TopBar;
