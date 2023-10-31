import React, { useState } from 'react';

function Comments({userProfileImages }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // Store comments
  const [topic, setTopic] = useState(''); // Store topic
  const [votes, setVotes] = useState({}); // Store votes for each comment

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { topic, name, comment };
    setComments([...comments, newComment]);
    setTopic('');
    setName('');
    setComment('');
  };

  const handleUpvote = (index) => {
    const updatedVotes = { ...votes };
    updatedVotes[index] = (updatedVotes[index] || 0) + 1;
    setVotes(updatedVotes);
  };

  const handleDownvote = (index) => {
    const updatedVotes = { ...votes };
    updatedVotes[index] = (updatedVotes[index] || 0) - 1;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <h2>Start a New Thread</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <div>
              <img
                src={userProfileImages[c.name]}
                alt={`${c.name}'s Profile`}
                width="50"
                height="50"
              />
            </div>
            <div>
              <strong>{c.name}:</strong> {c.comment} (Topic: {c.topic})
            </div>
            <div>
              <button onClick={() => handleUpvote(index)}>Upvote</button>
              <button onClick={() => handleDownvote(index)}>Downvote</button>
              <span>Votes: {votes[index] || 0}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;