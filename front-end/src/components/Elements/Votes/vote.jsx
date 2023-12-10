import React, {useState, useEffect} from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import "./Vote.css"

// liked and disliked of whether the user liked or disliked the post 
function Vote({votes, changeVotes, liked, disliked, changeLiked, changeDislike}) {

  function handleLike(){
    if (!liked && !disliked){
      changeVotes(votes + 1) 
      changeLiked(true)
    }
    else if (!liked && disliked){
      changeVotes(votes + 2) 
      changeLiked(true) 
      changeDislike(false) 
    }
    else if (liked) {
      changeVotes(votes - 1)
      changeLiked(false) 
    }
  }

  function handleDislike(){
    if (!disliked && !liked){
      changeVotes(votes - 1) 
      changeDislike(true) 
    }
    else if (!disliked && liked){
      changeVotes(votes - 2)
      changeDislike(true) 
      changeLiked(false) 
    }
    else if (disliked){
      changeVotes(votes + 1)
      changeDislike(false) 
    }
  }

  return (
    <div className="vote-main">
      <div className="vote-incr" style={{ color: liked ? 'orange' : 'black' }}>
        <ArrowUpwardIcon onClick={handleLike} />
      </div>
      {/* Updated span tag with expanded condition */}
      <span style={{ color: votes > 0 ? 'green' : votes === 0 ? 'black' : 'red' }}>{votes}</span>
      <div className="vote-decr" style={{ color: disliked ? 'orange' : 'black' }}>
        <ArrowDownwardIcon onClick={handleDislike} />
      </div>
    </div>
  )
}

export default Vote