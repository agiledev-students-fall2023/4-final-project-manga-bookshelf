import React, { useState , useEffect} from 'react';
import Comments from "../../components/Elements/Comments/Comments"

import "./forum.css"

const userProfileImages = {
    Killua: 'killua.jpg',
    Gon: 'killua.jpg',
    Hisoka: 'killua.jpg',
    Illumi: 'killua.jpg',
    Chrollo: 'killua.jpg',
    User1: 'killua.jpg',
    User2: 'killua.jpg',
  };
  // sample comments for now
const sampleComments = [
  {
    "name": "Killua",
    "comment": "I love HUNTERxHUNTER",
    "topic": "HUNTERxHUNTER"
  },
  {
    "name": "Gon",
    "comment": "I agree with Killua. It's awesome!",
    "topic": "HUNTERxHUNTER"
  },
  {
    "name": "Hisoka",
    "comment": "I have a different opinion.",
    "topic": "HUNTERxHUNTER"
  },
  {
    "name": "Illumi",
    "comment": "What's your opinion, Hisoka?",
    "topic": "HUNTERxHUNTER"
  },
  {
    "name": "Chrollo",
    "comment": "Hisoka, Shut up.",
    "topic": "HUNTERxHUNTER"
  }
];
const ulStyle = {
    listStyle: 'none',
  };

function Forum() {
  const [comments, setComments] = useState(sampleComments);

  
  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const groupCommentsByTopic = () => {
    const groupedComments = {};

    comments.forEach((comment) => {
      const topic = comment.topic || 'Other';

      if (!groupedComments[topic]) {
        groupedComments[topic] = [];
      }

      groupedComments[topic].push(comment);
    });

    return groupedComments;
  };

  const groupedComments = groupCommentsByTopic();

  return (
    <div className='forum-main'>
      <h1>Forum</h1>
      <Comments addComment={addComment} />
      <h2>All Threads</h2>
      {Object.keys(groupedComments).map((topic) => (
        <div key={topic}>
          <h3>{topic}</h3>
          <ul style={ulStyle}> {/* getting rid of dots*/}
            {groupedComments[topic].map((comment, index) => (
              <li key={index}>
                <div>
                  <img
                    src={userProfileImages[comment.name]}
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













