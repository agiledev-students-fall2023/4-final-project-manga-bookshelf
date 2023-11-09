import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import userImage from "../../../assets/userImage.png"

import "./UserItem.css"

function UserItem({ title, user }) {
    const[isFollowed, setIsFollowed] = useState(false)
    const { profileId } = useParams()

    const renderFollowButton = () => {
        user.followers.forEach(follower => {
            const followerString = follower.toString()
            if (followerString === profileId) {
                setIsFollowed(true)
            }
        })
    }

    useEffect(() => {
        renderFollowButton()
    })

    const handleFollowClick = () => {
        if (!isFollowed) {
            axios.post(`http://localhost:8080/user/${profileId}/follow`, {
                followingId: user.id,
            })
            .then(response => {
                setIsFollowed(!isFollowed)
            })
            .catch(err => {
                console.error('Error in follow request: ', err)
            })
        }
        else {
            axios.post(`http://localhost:8080/user/${profileId}/unfollow`, {
                unfollowingId: user.id,
            })
            .then(response => {
                setIsFollowed(!isFollowed)
            })
            .catch(err => {
                console.error('Error in unfollow request: ', err)
            })
        }

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