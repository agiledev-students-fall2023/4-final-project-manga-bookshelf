import React from 'react'
import CommentForm from '../Forum/CommentForm'

import "./ForumUser.css"

import ForumPostComment from '../../components/Layout/ForumPostComment/ForumPostComment'
import ForumPostUser from '../../components/Layout/ForumPostUser/ForumPostUser'

function ForumUser() {
  return (
    <div className="ForumUser-main">
      <ForumPostUser/>
      <CommentForm />
      <ForumPostComment/> 
      <ForumPostComment /> 
      <ForumPostComment /> 

    </div>
  )
}

export default ForumUser