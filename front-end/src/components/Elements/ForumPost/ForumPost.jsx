import React, { useEffect } from "react"

import "./ForumPost.css"

function ForumPost({username}){
    const user= username
    return (
        <div class= "ForumPost-forum">
            <form class="ForumPost-comment-entry">
                <div class="ForumPost-row">
                    <div class="ForumPost-col-labels">
                        <label for="username"> Username </label>
                    </div>
                    <div class="ForumPost-col-entries">
                        <p>{user}</p>
                    </div>
                </div>
                <div class="ForumPost-row">
                    <div class="ForumPost-col-labels">
                        <label for="comment"> Comment </label>
                    </div>
                    <div class="ForumPost-col-entries">
                        <textarea 
                            id="comment"
                            name="comment" 
                            placeholder="Write your comment here"
                            style={{ minHeight: '75px' , minWidth: '100%'}}>
                        </textarea>
                    </div>
                </div>
                <br></br>
                <div class="ForumPost-row">
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
