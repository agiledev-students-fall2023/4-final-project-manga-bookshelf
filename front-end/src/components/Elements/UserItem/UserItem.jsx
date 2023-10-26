import React from 'react'
import userImage from "../../../assets/userImage.png"

import "./UserItem.css"

function UserItem({ user }) {
    return (
        <div className='user-item'>
        <img src={userImage} alt={user.name} />
            <span>{user.name}</span>
            <button className='follow-button'>Follow +</button>
        
        <button className='remove-button'>Remove</button>
        </div>
    )
}

export default UserItem