import React, { useState , useEffect} from 'react';
import Comments from "../../components/Elements/Comments/Comments"
import ForumPost from "../../components/Elements/ForumPost/ForumPost"
import MockComments from "../../"
import "./forum.css"

import { useNavigate } from 'react-router-dom';

function Forum() {
  const navigate = useNavigate();
  const [data, setData] = useState({ userProfileImages: {}, sampleComments: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/comment/MockComments');
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='forum-main'>
      <button onClick={() => navigate(-1)}>Return to Previous Page</button>
      <h1>Forum</h1>
      <ForumPost username="Username goes here"/>
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

















