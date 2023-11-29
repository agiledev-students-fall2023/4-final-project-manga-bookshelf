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

    const navigateToProfile = () => {
        navigate(`/profile/${user.username}`)
    }

    useEffect(() => {
        console.log(profileId)
        console.log(user.following)
        setIsFollowed(user.follower.includes(profileId));
    }, [user.following, profileId])

    const handleFollowClick = () => {
        if (loading) {
            return
        }

        setLoading(true)
    
        const actionUrl = isFollowed 
            ? `${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/unfollow` 
            : `${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/follow`
    
        const payload = isFollowed
            ? { unfollowingName: user.username }
            : { followingName: user.username }
    
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
            ? `${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/unfollow`
            : `${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/remove`

        const payload = (title === 'Following')
            ? { unfollowingName: user.username }
            : { removingName: user.username }

        axios.post(actionUrl, payload)
            .then(response => {
                setIsFollowed(false)     
                // renderFollowButton()   
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
            <img src={userImage} alt={user.username} onClick={navigateToProfile}/>
            <span onClick={navigateToProfile}>{user.username}</span>
            
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