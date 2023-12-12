import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ForumId}) => {
    const [content, setContent] = useState('');
    const [clicked, setClicked] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));
        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/comment/add/${ForumId}`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    usernameId: storedUser.userId, 
                    username: storedUser.username, 
                    comment: content,
                    likes:0, 
                })
            })
            const data = await response.json();
            setClicked(true);
        } catch (err) {
            console.error('Error posting comment:', err);
        }
    };

    return (
        <form className="PostForum-form" onSubmit={submitForm}>
            <textarea
                placeholder="Enter a comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Create Comment</button>
            {
                clicked && <p>Comment created!</p>
            }
        </form>
    );
};

export default CommentForm;
