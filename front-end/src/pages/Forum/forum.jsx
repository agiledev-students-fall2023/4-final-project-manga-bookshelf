import React, { useState , useEffect,useCallback } from 'react';
import Comments from "../../components/Elements/Comments/Comments"
import ForumPost from "../../components/Elements/ForumPost/ForumPost"
import MockComments from "../../"
import "./forum.css"
import "./CommentForm.css"
import CommentForm from"./CommentForm.jsx"
import { useNavigate } from 'react-router-dom';
function Forum() {
const navigate = useNavigate();
const [groupedComments, setGroupedComments] = useState({});
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState('')
const [feedback, setFeedback] = useState('')
const fetchGroupedComments = useCallback(async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/grouped`, {
      headers: {
        'Cache-Control': 'no-cache', // Disable caching
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch grouped comments');
    }
    const groupedCommentsData = await response.json();
    console.log(groupedCommentsData); // Log the data here
    setGroupedComments(groupedCommentsData);
  } catch (error) {
    console.error('Error fetching grouped comments:', error.message);
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
const addCommentToList = (topic, newComment) => {
 setGroupedComments(prevGroupedComments => {
   const updatedGroupedComments = { ...prevGroupedComments };


   if (updatedGroupedComments[topic]) {
     updatedGroupedComments[topic].comments.push(newComment);
   } else {
     updatedGroupedComments[topic] = {
       _id: topic,
       comments: [newComment]
     };
   }


   return updatedGroupedComments;
 });
};


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
    {Object.values(groupedComments).length > 0 ? (
      Object.values(groupedComments).map((group) => (
        <div key={group._id}>
          <h3>{group._id}</h3> {/* Use group._id to display the topic name */}
          <ul style={{ listStyleType: 'none' }}>
            {group.comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.username}:</strong> {comment.comment}
              </li>
           ))}
   </ul>
 </div>
))
) : (
<p>No topics to display.</p>
)}
</div>
)
}

export default Forum;


