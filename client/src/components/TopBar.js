import React from "react";
import "../styles/topbar.css";
import useStateValue from '../context/AppContext'
function TopBar() {
  const [{user}, dispatch] = useStateValue();
  return <header className="topBar">
    <h2>My Chat</h2>
    <div className="userContainer" >
        <img src={user.photo} className="userImage"/>
    </div>
  </header>;
}

export default TopBar;
