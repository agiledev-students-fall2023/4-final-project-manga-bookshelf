import React, { useState , useEffect} from 'react';
import Comments from "../../components/Elements/Comments/Comments"
import ForumPost from "../../components/Elements/ForumPost/ForumPost"
import MockComments from "../../"
import "./forum.css"
import "./CommentForm.css"
import "./CommentForm.jsx"

import { useNavigate } from 'react-router-dom';

function Forum() {
  const navigate = useNavigate();
  const [groupedComments, setGroupedComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroupedComments = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/comments/grouped');
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

  

  if (Object.keys(groupedComments).length === 0) {
    return <div>No comments available.</div>;
  }

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
      {Object.keys(groupedComments).map((topic) => (
        <div key={topic}>
          <h3>{topic}</h3>
          <ul style={{ listStyleType: 'none' }}> {/* Inline style for demonstration */}
            {groupedComments[topic].map((comment, index) => (
              <li key={index}>
                <div>
                  <img
                    src={data.userProfileImages[comment.name] || 'default.jpg'}
                    alt={`${comment.name}'s Profile`}
                    width="50"
                    height="50"
                    style={{ borderRadius: '50%' }} 
                  />
                </div>
                <strong>{comment.name}:</strong> {comment.comment}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    
  );
  
}


export default Forum;

















