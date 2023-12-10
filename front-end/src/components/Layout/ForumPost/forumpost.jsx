import React, {useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Forumbody from '../../Elements/ForumBody/Forumbody'
import Vote from '../../Elements/Votes/Vote'

import "./Forumpost.css"

function Forumpost({likes, title, author, commentNumber}) {
  
  const navigate = useNavigate(Navigate)

  const handleClick = () => {
    navigate("/forum/1")
  }

  useEffect(() => {
    setLike(likes) 
  }, [])

  const [like, setLike] = useState(0)
  const [alreadyLike, setAlreadyLike] = useState(false) 
  const [alreadyDislike, setAlreadyDislike] = useState(false) 

  return (
    <div className="forumpost-main">
      <Vote votes={like} changeVotes={setLike} liked={alreadyLike} disliked={alreadyDislike} changeLiked={setAlreadyLike} changeDislike={setAlreadyDislike}/>
      <div className="forumpost-body" onClick={handleClick}>
        <Forumbody title={title} author={author} comments={commentNumber}/>
      </div>
    </div>
  )
}

export default Forumpost