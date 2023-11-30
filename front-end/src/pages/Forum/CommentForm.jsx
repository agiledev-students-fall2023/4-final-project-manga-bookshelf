import { useState } from 'react';
import axios from 'axios';
import './CommentForm.css'; 

const CommentForm = ({ addCommentToList, setError, setFeedback }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [topic, setTopic] = useState(''); // Assuming the topic is part of the form

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/save`, {
        name,
        comment,
        topic
      });

      addCommentToList(topic, response.data.comment); // Assuming the backend returns the saved comment
      setFeedback('Comment posted successfully!');
      setName('');
      setComment('');
      setTopic('');
    } catch (err) {
      setError(`Error posting comment: ${err}`);
    }
  };

  return (
    <form className="CommentForm-form" onSubmit={submitForm}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input type="submit" disabled={!name || !comment || !topic} value="Post Comment" />
    </form>
  );
};

export default CommentForm;