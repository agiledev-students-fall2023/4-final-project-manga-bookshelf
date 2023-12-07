import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { BsArrowLeft } from "react-icons/bs";


const Edit = () => {
  //object format for user info
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [file, setFile] = useState(null); 


  const [currentProfileInfo, setCurrentProfileInfo] = useState([])

  const handleReturn = () => {
    
    navigate(`/profile/${profileId}`);
  };

  //HERE!
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers(); 
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

      const myHeader2 = new Headers(); 
      myHeader2.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

      const formDataForSubmission = new FormData();

      formDataForSubmission.append('username', formData.name);
      formDataForSubmission.append('bio', formData.bio);
      formDataForSubmission.append('avatar', formData.avatar);
      formDataForSubmission.append('profileImage', file) 

      console.log(formDataForSubmission) 

      const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/edit/username/${profileId}`, {
        method: "POST", 
        headers: myHeaders, 
        body: JSON.stringify({"username": formData.name})
      })
      const data1 = await response1.json() 
      console.log(data1) 

      const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/edit/bio/${profileId}`, {
        method: "POST", 
        headers: myHeaders, 
        body: JSON.stringify({"bio": formData.bio})
      })
      const data2 = await response2.json() 
      console.log(data2) 

      const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/edit/profileImage/${profileId}`, {
        method: "POST",
        headers: myHeader2,
        body: formDataForSubmission  // Use the FormData object directly
      });
      const data3 = await response3.json() 
      console.log(data3)
  
      // Handle success, maybe show a success message
      console.log('Profile updated successfully');
      navigate(`/profile/${formData.name}?success=true`);
      //navigate(`/profile/${formData.name}`);
    } catch (error) {
      // Handle errors, maybe show an error message
      console.error('Error updating profile:', error);
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
      console.log(profileId)
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
  

  //only is for the form. not for DB
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleProfileImageChange(e){
    setFile(e.target.files[0]) 
  }


  return (
    <div className="edit-main">
      <button className="return-button" onClick={handleReturn}>
        <BsArrowLeft className="return-arrow" />
        Return to Profile Page
      </button>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
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
