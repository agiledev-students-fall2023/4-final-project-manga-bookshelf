import React, { useState , useEffect,useCallback } from 'react';
import Comments from "../../components/Elements/Comments/Comments"
import ForumPost from "../../components/Elements/ForumPost/ForumPost"
import MockComments from "../../"
import "./forum.css"
import "./CommentForm.css"
import CommentForm from"./CommentForm.jsx"

import { useNavigate } from 'react-router-dom';
//connected to backend
function Forum() {
  const navigate = useNavigate();
  const [groupedComments, setGroupedComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  //fetch comments and group them by topic
  const fetchGroupedComments = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/comments`);
      const data = await response.json();
      setGroupedComments(data);
    } catch (error) {
      console.error('Error fetching grouped comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroupedComments();
  }, [fetchGroupedComments]);
  
  /*
  if (Object.keys(groupedComments).length === 0) {
    return <div>No comments available.</div>;
  }
  */
  /*
  const navigate = useNavigate();
  const [data, setData] = useState({ userProfileImages: {}, sampleComments: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/MockComments`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupCommentsByTopic = () => {
    const groupedComments = {};

    data.sampleComments.forEach((comment) => {
      const topic = comment.topic || 'Other';

      if (!groupedComments[topic]) {
        groupedComments[topic] = [];
      }

      groupedComments[topic].push(comment);
    });

    return groupedComments;
  };

  const groupedComments = groupCommentsByTopic();
  */
  if (isLoading) {
    return <div>Loading...</div>;
  }
  //add comments to list
  const addCommentToList = (topic, newComment) => {
    // Check if the topic already exists in groupedComments
    if (groupedComments[topic]) {
      setGroupedComments(prevGroupedComments => ({
        ...prevGroupedComments,
        [topic]: [...prevGroupedComments[topic], newComment]
      }));
    } else {
      // If the topic doesn't exist, create a new entry for it
      setGroupedComments(prevGroupedComments => ({
        ...prevGroupedComments,
        [topic]: [newComment]
      }));
    }
  }
  
  
  
  return (
    
    <div className='forum-main'>
      <button onClick={() => navigate(-1)}>Return to Previous Page</button>
      <h1>Forum</h1>
      <CommentForm
        setError={setError}
        setFeedback={setFeedback}
        addCommentToList={addCommentToList}
      />
      {/*<ForumPost username="Username goes here"/> */}
      <h2>All Threads</h2>
      {Object.keys(groupedComments).length > 0 ? (
        Object.keys(groupedComments).map((topic) => (
          <div key={topic}>
            <h3>{topic}</h3>
            <ul style={{ listStyleType: 'none' }}> {/* Inline style for demonstration */}
              {Array.isArray(groupedComments[topic]) ? (
                groupedComments[topic].map((comment, index) => (
                  <li key={index}>
                    {/* The rest of your comment rendering */}
                    <strong>{comment.name}:</strong> {comment.comment}
                  </li>
                ))
              ) : (
                <li>No comments for this topic.</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No topics to display.</p>
      )}
    </div>
  );
  
}


export default Forum;

















