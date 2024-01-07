import React, { useState, useRef, useEffect } from "react";
import "../styles/profile.css";
import useStateValue from "../context/AppContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {app} from "../firebase";
import { addUser } from "../context/actions/register";
// import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
function Profile() {
  const fileRef = useRef(null);
  const [{ user }, dispatch] = useStateValue();
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (file) {
        // console.log(file);
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      //for getting the URL of the uploaded profile image
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addUser(dispatch,{ ...user, photo: downloadURL });
          setFormData({...formData,photo: downloadURL})
        });
      }
    );
  };
  const updateUser = async()=>{
    try {
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFail(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch(updateUserFail(error.message));
      }
  }
  const handleClick = async (e) => {
    e.preventDefault();
    if (edit) {
    } else {
      setEdit(true);
    }
  };
  const handleChange = (e) => {
    setFormData({...formData,[e.target.id] : e.target.value})
  };
  return (
    <div className="profileContainer">
      <h1 className="profileTitle">Profile</h1>
      <div className="imageContainer">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.photo ? formData.photo : user.photo}
          onClick={() => fileRef.current.click()}
          alt="profile pic"
          className="profilePhoto"
        />
        <p className="imageUploadText">
          {filePerc > 0 && filePerc < 100 ? (
            <span className="uploading">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="uploaded">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        {/* <DriveFileRenameOutlineOutlinedIcon /> */}
      </div>

      <form className="profileForm">
        <label for="name" className="profileLabel">
          Name
        </label>
        <input
          className="profileInput"
          id="name"
          type="text"
          placeholder="Name..."
          defaultValue={user.name}
          onChange={handleChange}
          disabled={!edit}
        />
        <label for="email" className="profileLabel">
          Email
        </label>
        <input
          className="profileInput"
          id="email"
          type="email"
          placeholder="Email..."
          defaultValue={user.email}
          onChange={handleChange}
          disabled={!edit}
        />
        <label for="phone" className="profileLabel">
          Phone
        </label>
        <input
          className="profileInput"
          id="phone"
          type=""
          placeholder="Phone Number..."
          defaultValue={user?.phone}
          onChange={handleChange}
          disabled={!edit}
        />
        {edit && (
          <>
            <label for="password" className="profileLabel">
              Password
            </label>
            <input
              className="profileInput"
              id="password"
              type=""
              placeholder="Password"
              onChange={handleChange}
            />
          </>
        )}

        <button
          className={`updateButton ${!edit ? "edit" : ""}`}
          onClick={handleClick}
        >
          {edit ? "Update" : "Edit"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
