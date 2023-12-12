import React from 'react'

import "./forumbody.css"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function ForumBody({title, author, comments}) {
  return (
    <div className="forumbody-main">
      <h1>{title}</h1>
      <span>Posted by: {author}</span>
      <div className="forumbody-comment"><ChatBubbleOutlineIcon />Comments:{comments}</div>
    </div>
  )
}

export default ForumBody