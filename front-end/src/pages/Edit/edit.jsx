import React, { useState, useEffect } from 'react';
import "./edit.css"

const Edit = () => {
  //object format for user info
  const [currentProfileInfo, setCurrentProfileInfo] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/update/bio`, {
        method: "PUT", // or "PATCH" depending on your API endpoint
        headers: myHeaders,
        body: JSON.stringify({ bio: formData.bio }),
      });

      if (response.ok) {
        // Update local state or perform any necessary actions
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

  console.log(currentProfileInfo);

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
  

  console.log(formData)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="edit-main">
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
        <label htmlFor="socialMedia">Twitter Link:</label>
        <input
          type="text"
          id="socialMedia"
          name="socialMedia"
          value={formData.socialMedia}
          onChange={handleChange}
          required
        />
      </div>

      <div className="edit-main">
        <label htmlFor="avatar">Avatar (Profile Picture):</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          required
        />
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
        <button type="button">
          Save Changes
        </button>
      </div>
      </form>
    </div>
  );
};

export default Edit;
