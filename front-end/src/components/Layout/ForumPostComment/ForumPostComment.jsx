import React, {useState, useEffect} from 'react'
import Vote from '../../Elements/Votes/vote.jsx'

import "./ForumPostComment.css"

function ForumPostComment({CommentId}) {

  const [like, setLike] = useState(0)
  const [alreadyLike, setAlreadyLike] = useState(false)
  const [alreadyDislike, setAlreadyDislike] = useState(false)

  const [commentData, setCommentData] = useState({})
  const [loading, setLoading] = useState(true) 

  //TODO: fetch the comment based on Id
  useEffect(() => {
    const myHeaders = new Headers();
    const storedToken = localStorage.getItem("jwtToken");
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${storedToken}`);

    async function getComments(){
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/comment/get/${CommentId}`,{
          method: "GET",
          headers: myHeaders
        })
        const data = await response.json()
        console.log(data["comment"]) 
        setCommentData(data["comment"])
        setLike(data["comment"]["likes"])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching forum post:', err)
      }
    }
    getComments()
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ForumPostComment-main">
        <span> posted by: {commentData.username}<img></img></span>
        <div className="ForumPostComment-body">
          <Vote votes={like} changeVotes={setLike} liked={alreadyLike} disliked={alreadyDislike} changeLiked={setAlreadyLike} changeDislike={setAlreadyDislike} />
          <p>{commentData.comment}</p>
        </div>
        {/* <span>Posted on: x Days ago</span> */}
      </div>
    )
}

export default ForumPostComment
