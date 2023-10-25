import React from 'react'
import userImage from "../../../assets/userImage.png"

import "./UserItem.css"

function UserItem({ user }) {
    return (
        <div className='user-item'>
        <img src={userImage} alt={user.name} />
        <span>{user.name}</span>
        </div>
    )
}

export default UserItem