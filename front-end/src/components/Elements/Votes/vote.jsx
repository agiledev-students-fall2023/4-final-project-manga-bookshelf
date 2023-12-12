import React, {useState, useEffect} from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; 
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'; 
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

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
      <div className="vote-incr">
        {/* Conditional rendering for like icon */}
        {liked ? <ThumbUpAltIcon onClick={handleLike} />
          : <ThumbUpOffAltIcon onClick={handleLike} />}
      </div>
      {/* Updated span tag with expanded condition */}
      <span style={{ color: votes > 0 ? 'green' : votes === 0 ? 'black' : 'red' }}>{votes}</span>
      <div className="vote-decr">
        {/* Conditional rendering for dislike icon */}
        {disliked ? <ThumbDownAltIcon onClick={handleDislike} />
          : <ThumbDownOffAltIcon onClick={handleDislike} />}
      </div>
    </div>
  );
}

export default Vote