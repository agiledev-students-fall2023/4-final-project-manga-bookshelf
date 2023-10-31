import React, { useEffect } from "react"

import "./ForumPost.css"

function ForumPost({username}){
    const user= username
    return (
        <div class= "forum">
            {/* <div class = "username">
                <label for= "User">
                </label>
                <
            </div>
            <div class ="entry">
            <label> Comment </label>
                <input 
                    type="text"
                    id="comment"
                    name="comment" 
                    placeholder="Write your comment here"
                />
            </div> */}
            <form class="comment-entry">
                <div class="row">
                    <div class="col-labels">
                        <label for="username"> Username </label>
                    </div>
                    <div class="col-entries">
                        <p>{user}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-labels">
                        <label for="comment"> Comment </label>
                    </div>
                    <div class="col-entries">
                        <textarea 
                            // type= "forum"
                            id="comment"
                            name="comment" 
                            placeholder="Write your comment here"
                            style={{ minHeight: '200px' , minWidth: '100%'}}>
                        </textarea>
                    </div>
                </div>
                <br></br>
                <div class="row">
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
