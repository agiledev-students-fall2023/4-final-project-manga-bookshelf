import { useState, useContext } from 'react';
import axios from 'axios';
import './CommentForm.css';
import { AuthContext } from '../../context/AuthContext'; 

const CommentForm = ({ addCommentToList, setError, setFeedback }) => {
 const { user } = useContext(AuthContext); // Retrieve the user info from context
 const [comment, setComment] = useState('');
 const [topic, setTopic] = useState('');

 const submitForm = async (e) => {
   e.preventDefault();
   console.log('Form submission started');
   console.log(`Backend URL: ${process.env.REACT_APP_BACKEND_URL}`); // Log the backend URL
   // Logging the user info from localStorage
   console.log("Stored user info:", localStorage.getItem("user"))
   const storedUser = JSON.parse(localStorage.getItem("user"));
   console.log("Stored user info:", storedUser);
   console.log("Username:", storedUser.username);


   const token = localStorage.getItem("jwtToken")
   // Log the form data being submitted
 console.log("Submitting form with topic and comment:", topic, comment);
 console.log("Token from localStorage:", token);
   if (!storedUser.username) {
     setError('You must be logged in to post a comment.');
     return;
   }
   const config = {
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     }
   };
   // Log the data you're sending
   console.log('Sending data:', { username: storedUser.username, comment, topic });
   try {
     const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment/comments/save`, {
       username:storedUser.username,
       //userId: user._id, // Send the userId from the context
       comment,
       topic
     }, config);
     // Log the response from the server
   console.log('Response data:', response.data);
     addCommentToList(topic, { ...response.data.comment, username: storedUser.username }); // Include the username in the comment
     setFeedback('Comment posted successfully!');
     setComment('');
     setTopic('');
   } catch (err) {
     console.error('Error posting comment:', err);
     setError(`Error posting comment: ${err.response?.data?.message || err.message}`);
     setError(`Error posting comment: ${err.response?.data?.message || err.message}`);
   }
 };

 return (
   <form className="CommentForm-form" onSubmit={submitForm}>
     <input
       type="text"
       placeholder="Enter topic"
       value={topic}
       onChange={(e) => setTopic(e.target.value)}
     />
     <textarea
       placeholder="Enter a comment"
       value={comment}
       onChange={(e) => setComment(e.target.value)}
     />
      <button type="submit" disabled={!comment || !topic}>Post Comment</button>
   </form>
 );
};

export default CommentForm;