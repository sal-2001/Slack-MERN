import React, { useState } from "react";
import "../styles/profile.css";
import useStateValue from "../context/AppContext";
// import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [edit, setEdit] = useState(false);
  const handleChange = (e) => {};
  return (
    <div className="profileContainer">
      <h1 className="profileTitle">Profile</h1>
      <div className="iamgeContainer">
        <img src={user.photo} alt="profile pic" className="profilePhoto" />
        {/* <DriveFileRenameOutlineOutlinedIcon /> */}
      </div>

      <form className="profileForm">
        <label for="name" className="profileLabel">Name</label>
        <input
          className="profileInput"
          id="name"
          type="text"
          placeholder="Name..."
          value={user.name}
          onChange={handleChange}
        />
        <label for="email" className="profileLabel">Email</label>
        <input
          className="profileInput"
          id="email"
          type="email"
          placeholder="Email..."
          value={user.email}
          onChange={handleChange}
        />
        <label for="phone" className="profileLabel">Phone</label>
        <input
          className="profileInput"
          id="phone"
          type=""
          placeholder="Phone Number..."
          value={user?.phone}
          onChange={handleChange}
        />
        <label for="password" className="profileLabel">Password</label>
        <input
          className="profileInput"
          id="password"
          type=""
          placeholder="Password"
          onChange={handleChange}
        />
        <button className={`updateButton ${!edit ? "edit" : ""}`}>
          {edit ? "Update" : "Edit"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
