import React, { useState, useEffect, useCallback } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'; 
import CommentForm from "./CommentForm.jsx";
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer'; 

import "./forum.css"

import Forumpost from '../../components/Layout/ForumPost/Forumpost.jsx';

function Forum() {
  const navigate = useNavigate();
  const [groupedComments, setGroupedComments] = useState({});
  const [userProfiles, setUserProfiles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  const fetchUserProfile = async (username) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("jwtToken")}`);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/anotheruser/${username}`, {
        method: "GET",
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile for user ${username}`);
      }

      const data = await response.json();
      // Assume the profile image is in the `profileImg` field and it's a Buffer
      const image = `data:${data.profileImg.contentType};base64,${Buffer.from(data.profileImg.data).toString('base64')}`;
      return { ...data, profileImg: image };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  const addCommentToList = (topic, newComment) => {
    setGroupedComments(prevGroupedComments => {
      // Copy the previous state
      const updatedGroupedComments = { ...prevGroupedComments };
  
      // If the topic already exists, push the new comment to its comments array
      if (updatedGroupedComments[topic]) {
        updatedGroupedComments[topic].comments.push(newComment);
      } else {
        // If the topic doesn't exist, create a new entry with the new comment
        updatedGroupedComments[topic] = {
          _id: topic,
          comments: [newComment]
        };
      }
  
      return updatedGroupedComments;
    });
  };
  
  
  const fetchGroupedComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/grouped`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch grouped comments');
      }
      const data = await response.json();
      setGroupedComments(data);

      // Fetch user profiles for each unique username in comments
      const uniqueUsernames = new Set();
      Object.values(data).forEach(group => {
        group.comments.forEach(comment => {
          uniqueUsernames.add(comment.username);
        });
      });

      const profiles = {};
      for (const username of uniqueUsernames) {
        profiles[username] = await fetchUserProfile(username);
      }
      setUserProfiles(profiles);

    } catch (error) {
      console.error('Error fetching grouped comments:', error);
      setError('Failed to fetch comments.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroupedComments();
  }, [fetchGroupedComments]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  
    
  

  return (
    <div className='forum-main'>
      <button onClick={() => navigate(-1)}><KeyboardReturnIcon/>Return to Previous Page</button>
      <h1>Forum</h1>
      <CommentForm setError={setError} setFeedback={setFeedback} addCommentToList={addCommentToList } />
      {/* <h2>All Threads</h2>
      {Object.values(groupedComments).length > 0 ? (
      Object.entries(groupedComments).map(([topic, group]) => (
        <div key={topic}>
          <h3>{group._id}</h3>
          <ul style={{ listStyleType: 'none' }}>
          {group.comments.map((comment, index) => (
              <li key={index}>
                <img src={userProfiles[comment.username]?.profileImg} alt={`${comment.username}'s profile`} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}/>
                <span className="username">{comment.username}</span>: {comment.comment}
              </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No topics to display.</p>
      )} */}
      <Forumpost likes={0} title={"test"} author={"robert"} commentNumber={1}/>
      <Forumpost likes={0} title={"test"} author={"robert"} commentNumber={1} />
      <Forumpost likes={2} title={"test"} author={"robert"} commentNumber={1} />
      <Forumpost likes={2} title={"test"} author={"robert"} commentNumber={1} />
      <Forumpost likes={2} title={"test"} author={"robert"} commentNumber={1} />
      <Forumpost likes={2} title={"test"} author={"robert"} commentNumber={1} />
      <Forumpost likes={2} title={"test"} author={"robert"} commentNumber={1} />
      <Forumpost likes={2} title={"test"} author={"robert"} commentNumber={1} />
      <Forumpost likes={2} title={"test"} author={"robert"} commentNumber={1} />
    </div>
  );
}

export default Forum;


