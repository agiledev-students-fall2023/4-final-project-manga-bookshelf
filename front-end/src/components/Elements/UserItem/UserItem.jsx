import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userImage from "../../../assets/userImage.png"

import "./UserItem.css"

function UserItem({ title, user }) {
    const[isFollowed, setIsFollowed] = useState(false)
    const { profileId } = useParams()

    useEffect(() => {
        const renderFollowButton = () => {
            user.followers.forEach(follower => {
                const followerString = follower.toString()
                if (followerString === profileId) {
                    console.log("there is match")
                    setIsFollowed(true)
                }
            })
        }
        renderFollowButton()
    })

    const handleFollowClick = () => {
        console.log(user.following)
        
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