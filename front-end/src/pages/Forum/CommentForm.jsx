




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
    console.log(`Backend URL: ${process.env.REACT_APP_BACKEND_URL}`);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored user info:", storedUser);

    const token = localStorage.getItem("jwtToken");
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

    console.log('Sending data:', { username: storedUser.username, comment, topic });
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment/comments/save`, {
        username: storedUser.username,
        comment,
        topic
      }, config);

      if (response.data && response.data.status === 'all good') {
        // Create a new comment object with the structure expected by the Forum component
        const newComment = {
          username: storedUser.username,
          comment: comment
          // Add any other properties that are part of a comment object in your application
        };

        // Update the parent component's state
        addCommentToList(topic, newComment);
        setFeedback('Comment posted successfully!');
        setComment('');
        setTopic('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
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
      <button type="submit" disabled={!comment || !topic}>Create Post</button>
    </form>
  );
};

export default CommentForm;
