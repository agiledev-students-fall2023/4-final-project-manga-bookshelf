import { React, useEffect, useState, useCallback } from 'react'
import FollowList from '../../components/Layout/FollowList/FollowList'
import { useNavigate, useParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

import './follow.css'

function Follow({ title }) {
    const navigate = useNavigate()
    const { profileId } = useParams()
    const [followers, setFollowers] = useState([])

    const handleReturn = () => {
        navigate(`/profile/${profileId}`)
    }

    const fetchFollowers = useCallback(async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/follower`);
        const data = await response.json();
        setFollowers(data);
    }, [profileId]);

    const fetchFollowing = useCallback(async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/following`);
        const data = await response.json();
        setFollowers(data);
    }, [profileId]);

    useEffect(() => {
        if (title === 'Follower') fetchFollowers()
        else if (title === 'Following') fetchFollowing()
    }, [title, fetchFollowers, fetchFollowing])

    const refetchFollowData = () => {
        if (title === 'Follower') {
            fetchFollowers();
        } else if (title === 'Following') {
            fetchFollowing();
        }
    };

    return (
        <div className="follow-main">
            <button className='return-button' onClick={handleReturn}>
                <BsArrowLeft className='return-arrow'/>
                Return to Profile Page
            </button>
            <FollowList title={title} users={followers} onUnfollowClick={refetchFollowData}/>
            
        </div>
    )
}

export default Follow