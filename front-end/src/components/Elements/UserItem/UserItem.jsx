import { React, useState } from 'react'
import userImage from "../../../assets/userImage.png"

import "./UserItem.css"

function UserItem({ title, user }) {
    const[isFollowed, setIsFollowed] = useState(false)

    const handleFollowClick = () => {
        setIsFollowed(!isFollowed)
    }

    return (
        <div className='user-item'>
            <img src={userImage} alt={user.name} />
            <span>{user.name}</span>

            {title === 'Follower' && (
                <button 
                    className={`follow-button ${isFollowed ? 'followed' : ''}`}
                    onClick={handleFollowClick}
                >
                    {isFollowed ? 'Followed' : 'Follow +'}
                </button>
            )}
            
            <button className='remove-button'> 
                {(title === 'Follower') ? 'Remove' : 'Unfollow'} 
            </button>
        </div>
    )
}

export default UserItem