import React, { useState, useEffect, useCallback } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'; 
import PostForum from "../../components/Elements/PostForum/PostForum.jsx";
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer'; 

import "./forum.css"

import ForumPost from '../../components/Layout/ForumPost/forumpost.jsx';
import ForumPostComment from '../../components/Layout/ForumPostComment/ForumPostComment.jsx';
import ForumPostUser from '../../components/Layout/ForumPostUser/ForumPostUser.jsx';
import ForumUser from '../ForumUser/ForumUser.jsx';

function Forum() {
  const navigate = useNavigate();
  const [groupedComments, setGroupedComments] = useState({});
  const [userProfiles, setUserProfiles] = useState({});
  
  //for the forum list that we want to fetch from the backend
  const [forumPost, setForumPost] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getForumPosts(){
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("jwtToken")}`);
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/forumpost/get`, {
          method: "GET",
          headers: myHeaders
        });
        const data = await response.json();
        setForumPost(data["data"]);
        console.log(data["data"]);
        setIsLoading(false) 
      } catch (error) {
        console.error('Error fetching grouped comments:', error);
      } 
    }
    
    getForumPosts()
  },[])
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className='forum-main'>
      <button onClick={() => navigate(-1)}><KeyboardReturnIcon/>Return to Previous Page</button>
      <h1>Forum</h1>
      <PostForum />
      {forumPost.map(post => 
          <ForumPost likes={post["likes"]} title={post["title"]} author={post["creator"]} commentNumber={post["comments"].length} forumId={post._id}/>
      )}

    </div>
  );
}

export default Forum;


