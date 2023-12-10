import React from 'react'
import Vote from '../../Elements/Votes/Vote'

import "./ForumPostComment.css"

function ForumPostComment() {
  return (
    <div className="ForumPostComment-main">
        <span> posted by: <img></img></span>
        <div className="ForumPostComment-body">
          <Vote />
          <p>CommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentComment</p>
        </div>
        <span>Posted on: x Days ago</span>
      </div>
    )
}

export default ForumPostComment
