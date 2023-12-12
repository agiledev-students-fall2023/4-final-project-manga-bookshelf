import React, { useState } from 'react';
import './PostForum.css';

const PostForum = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [clicked, setClicked] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUserId = localStorage.getItem("userId");
    
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/forumpost/add`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          creator: storedUser.username,
          creatorId: storedUserId,
          title: topic,
          body: content,
          likes: 0, 
          comments: []
         })
      })
      const data = await response.json();
      setClicked(true);
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <form className="PostForum-form" onSubmit={submitForm}>
      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <textarea
        placeholder="Enter a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Post</button>
      {
        clicked && <p>Post created!</p>
      }
    </form>
  );
};

export default PostForum;
