import React, {useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ForumBody from '../../Elements/ForumBody/forumbody.jsx'
import Vote from '../../Elements/Votes/vote.jsx'

import "./forumpost.css"

function ForumPost({likes, title, author, commentNumber, forumId}) {
  
  const navigate = useNavigate(Navigate)

  const handleClick = () => {
    navigate(`/forum/${forumId}`)
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
        <ForumBody title={title} author={author} comments={commentNumber}/>
      </div>
    </div>
  )
}

export default ForumPost