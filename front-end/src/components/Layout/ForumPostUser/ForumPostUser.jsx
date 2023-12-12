import React, {useState, useEffect} from 'react'
import Vote from '../../Elements/Votes/Vote.jsx'
import "./ForumPostUser.css" 

function ForumPostUser({ likes, title, content, author }) {
  const [like, setLike] = useState(0)
  const [alreadyLike, setAlreadyLike] = useState(false)
  const [alreadyDislike, setAlreadyDislike] = useState(false) 

  useEffect(() => {
    setLike(likes)
  }, [])

  return (
    <div className="ForumPostUser-main">
        <h1>{title}</h1> 
        <div className="ForumPostUser-body">
            <Vote votes={like} changeVotes={setLike} liked={alreadyLike} disliked={alreadyDislike} changeLiked={setAlreadyLike} changeDislike={setAlreadyDislike} />
            <p>{content}</p>
        </div>
        <div className="ForumPostUser-footer">
            <span> posted by: {author}<img></img></span>
            {/* <span>x Days ago</span> */}
        </div>
    </div>
  )
}

export default ForumPostUser