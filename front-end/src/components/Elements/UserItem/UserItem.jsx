import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import userImage from "../../../assets/userImage.png"

import "./UserItem.css"

function UserItem({ title, user, onUnfollowClick }) {
    const[isFollowed, setIsFollowed] = useState(false)
    const [loading, setLoading] = useState(false)
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
        if (loading) {
            return
        }

        setLoading(true)
    
        const actionUrl = isFollowed 
            ? `http://localhost:8080/user/${profileId}/unfollow` 
            : `http://localhost:8080/user/${profileId}/follow`
    
        const payload = isFollowed
            ? { unfollowingId: user.id }
            : { followingId: user.id }
    
        axios.post(actionUrl, payload)
            .then(response => {
                setIsFollowed(!isFollowed)
            })
            .catch(err => {
                console.error(`Error in ${isFollowed ? 'unfollow' : 'follow'} request: `, err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleUnfollowClick = () => {
        if (loading) {
            return
        }

        setLoading(true)

        const actionUrl = `http://localhost:8080/user/${profileId}/unfollow`

        const payload = { unfollowingId: user.id }

        axios.post(actionUrl, payload)
            .then(response => {
                setIsFollowed(false)        
                onUnfollowClick()       
            })
            .catch(err => {
                console.error(`Error in unfollow request: `, err)
            })
            .finally(() => {
                setLoading(false)
            })
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
            
            <button className='remove-button' onClick={handleUnfollowClick}> 
                {(title === 'Follower') ? 'Remove' : 'Unfollow'} 
            </button>
        </div>
    )
}

export default UserItem