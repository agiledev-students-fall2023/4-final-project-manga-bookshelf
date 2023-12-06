import React, { useState, useEffect } from 'react';
import "./edit.css"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';


const Edit = () => {
  //object format for user info

  const [file, setFile] = useState(""); 

  const [currentProfileInfo, setCurrentProfileInfo] = useState([])
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const handleSuccessAlert = () => {
    setAlertOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/update/bio`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ bio: formData.bio }),
      });

      if (response.ok) {
        // Update local state or perform any necessary actions
        handleSuccessAlert();
        console.log("Bio updated successfully");
      } else {
        // Handle error response
        console.error("Failed to update bio:", response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error updating bio:", error);
    }
  };

  useEffect(() => {
    async function getCurrentUser(){
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

      const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`, {
        method: "GET",
        headers: myHeaders
      })
      const data3 = await response3.json()
      setCurrentProfileInfo(data3["user"]) 
    }
    getCurrentUser()
  }, [])

  const [formData, setFormData] = useState({
    name: currentProfileInfo.username,
    socialMedia: currentProfileInfo.twitter,
    avatar: currentProfileInfo.profileImg,
    bio: currentProfileInfo.bio,
  });

  useEffect(() => {
    setFormData({
      name: currentProfileInfo.username || "",
      socialMedia: currentProfileInfo.twitter || "",
      avatar: currentProfileInfo.profileImg || "",
      bio: currentProfileInfo.bio || "",
    });
  }, [currentProfileInfo]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleProfileImageChange(e){
    console.log(e.target.files) 
    setFile(URL.createObjectURL(e.target.files[0])) 
    console.log(file) 
  }

  return (
    <div className="edit-main">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity="success">
          <AlertTitle>Success</AlertTitle>
          Bio updated successfully!
        </Alert>
      </Snackbar>
        <div>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        </div>

      <div className="edit-main">
        <label htmlFor="avatar">Avatar (Profile Picture):</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleProfileImageChange}
          required
        />
      </div>
      <div className="edit-main">
        <img src={file} alt="No picture selected"/>
      </div>

      <div className="edit-main">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          rows="4"
          value={formData.bio}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="edit-main">
        <button type="submit">
          Save Changes
        </button>
      </div>
      </form>
    </div>
  );
};

export default Edit;
