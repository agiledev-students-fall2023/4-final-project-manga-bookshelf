import React, { useState } from 'react';
import "./edit.css"

const Edit = () => {
  const [formData, setFormData] = useState({
    name: '',
    socialMedia: '',
    avatar: '',
    bio: '',
  });

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
      <form>
        <div>
        <label htmlFor="name">Name:</label>
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
