import React, { useEffect } from "react"

import "./ForumPost.css"

function ForumPost({username}){
    const user= username
    return (
        <div className= "ForumPost-forum">
            <form className="ForumPost-comment-entry">
                <div className="ForumPost-row">
                    <div className="ForumPost-col-labels">
                        <label htmlFor="username"> Username </label>
                    </div>
                    <div className="ForumPost-col-entries">
                        <p>{user}</p>
                    </div>
                </div>
                <div className="ForumPost-row">
                    <div className="ForumPost-col-labels">
                        <label htmlFor="comment"> Comment </label>
                    </div>
                    <div className="ForumPost-col-entries">
                        <textarea 
                            id="comment"
                            name="comment" 
                            placeholder="Write your comment here"
                            style={{ minHeight: '75px' , minWidth: '100%'}}>
                        </textarea>
                    </div>
                </div>
                <br></br>
                <div className="ForumPost-row">
                    <input 
                        type="submit" 
                        value="Submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default ForumPost;
