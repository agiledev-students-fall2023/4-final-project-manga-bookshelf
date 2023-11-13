import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import userImage from "../../../assets/userImage.png"

import "./UserItem.css"

function UserItem({ title, user, onUnfollowClick }) {
    const[isFollowed, setIsFollowed] = useState(false)
    const [loading, setLoading] = useState(false)
    const { profileId } = useParams()
    const navigate = useNavigate()

    const renderFollowButton = () => {
        user.followers.forEach(follower => {
            const followerString = follower.toString()
            if (followerString === profileId) {
                setIsFollowed(true)
            }
            else {
                setIsFollowed(false)
            }
        })
    }

    const navigateToProfile = () => {
        navigate(`/profile/${user.id}`)
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
                // renderFollowButton()
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

        const actionUrl = (title === 'Following')
            ? `http://localhost:8080/user/${profileId}/unfollow`
            : `http://localhost:8080/user/${profileId}/remove`

        const payload = (title === 'Following')
            ? { unfollowingId: user.id }
            : { removingId: user.id }

        axios.post(actionUrl, payload)
            .then(response => {
                setIsFollowed(false)     
                renderFollowButton()   
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
            <img src={userImage} alt={user.name} onClick={navigateToProfile}/>
            <span onClick={navigateToProfile}>{user.name}</span>
            
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