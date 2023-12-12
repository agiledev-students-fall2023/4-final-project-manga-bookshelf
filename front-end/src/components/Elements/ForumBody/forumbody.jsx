import React from 'react'

import "./Forumbody.css"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function Forumbody({title, author, comments}) {
  return (
    <div className="forumbody-main">
      <h1>{title}</h1>
      <span>Posted by: {author}</span>
      <div className="forumbody-comment"><ChatBubbleOutlineIcon />Comments:{comments}</div>
    </div>
  )
}

export default Forumbody