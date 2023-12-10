import React, {useEffect, useState} from 'react'
import Forumbody from '../../Elements/ForumBody/Forumbody'
import Vote from '../../Elements/Votes/Vote'

import "./Forumpost.css"

function Forumpost({likes, title, author, commentNumber}) {
  
  useEffect(() => {
    setLike(likes) 
  }, [])

  const [like, setLike] = useState(0)
  const [alreadyLike, setAlreadyLike] = useState(false) 
  const [alreadyDislike, setAlreadyDislike] = useState(false) 

  return (
    <div className="forumpost-main">
      <Vote votes={like} changeVotes={setLike} liked={alreadyLike} disliked={alreadyDislike} changeLiked={setAlreadyLike} changeDislike={setAlreadyDislike}/>
        <Forumbody title={title} author={author} comments={commentNumber}/>
    </div>
  )
}

export default Forumpost