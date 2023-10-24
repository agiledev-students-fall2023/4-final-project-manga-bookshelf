import React from 'react'
import userImage from "../../../assets/userImage.png"

// Currently without styling

function UserItem({ user }) {
    return (
        <div className='user-item'>
        <img src={userImage} alt={user.name} style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',  // This ensures the image scales properly and doesn't get distorted
                    borderRadius: '50%'   // Optional: This makes the image circular
                }}/>
        <span>{user.name}</span>
        </div>
    )
}

export default UserItem