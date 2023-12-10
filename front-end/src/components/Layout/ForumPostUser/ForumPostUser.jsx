import React from 'react'
import Vote from '../../Elements/Votes/Vote'
import "./ForumPostUser.css" 

function ForumPostUser() {
  return (
    <div className="ForumPostUser-main">
        <h1>Title</h1> 
        <div className="ForumPostUser-body">
            <Vote/>
            <p>Here is some paragraph that is required here that I don' tknow what to say so I'm saying a bunch of thingie</p>
        </div>
        <div className="ForumPostUser-footer">
            <span> posted by: <img></img></span>
            <span>x Days ago</span>
        </div>
    </div>
  )
}

export default ForumPostUser