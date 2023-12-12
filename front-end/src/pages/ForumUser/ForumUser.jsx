import React, {useState, useEffect} from 'react'

import "./ForumUser.css"

import CommentForm from '../../components/Elements/CommentForm/CommentForm'
import ForumPostComment from '../../components/Layout/ForumPostComment/ForumPostComment'
import ForumPostUser from '../../components/Layout/ForumPostUser/ForumPostUser'
import { useParams } from 'react-router-dom'

function ForumUser() {

  const [formData, setFormData] = useState(null)
  const {forumId} = useParams() 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getForumPost() {
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/forumpost/get/single/${forumId}`,{
          method: "GET",
          headers: myHeaders
        })
        console.log(response) 
        const data = await response.json()
        setFormData(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching forum post:', err)
      }
    }
    getForumPost()
  }, [])

  if (loading){
      return <div>Loading...</div>  
  }

  return (
    <div className="ForumUser-main">
      <ForumPostUser likes={formData.likes} title={formData.title} content={formData.body} author={formData.creator} />
      <CommentForm ForumId={forumId}/>
      {formData.comments.map(comment =>
        <ForumPostComment CommentId={comment} />)
      }
    </div>
  )
}

export default ForumUser