import React, { useState } from "react";
import "../styles/topbar.css";
import useStateValue from '../context/AppContext'
import Profile from "./Profile";
import { Link } from "react-router-dom";
function TopBar() {
  const [{user}, _] = useStateValue();
  const [openProfile, setOpenProfile] = useState(false);
  const closeProfile = ()=>{
    setOpenProfile(false);
  }
  // console.log('user',user);
  return <header className="topBar">
    <h2>My Chat</h2>
    <div className="userContainer" onClick={()=>setOpenProfile(true)}>
      {
        user.photo ? (<img src={user.photo} className="userImage"/>):(<Link to='/'>Sign In</Link>)
      }
        
    </div>
    {
      openProfile && <Profile closeProfile={closeProfile}/>
    }
  </header>;
}

export default TopBar;
