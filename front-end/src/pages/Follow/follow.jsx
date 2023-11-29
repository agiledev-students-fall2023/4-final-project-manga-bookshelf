import { React, useEffect, useState, useCallback } from 'react'
import FollowList from '../../components/Layout/FollowList/FollowList'
import { useNavigate, useParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

import './follow.css'

// // This is for mocking purposes only
// const follower = [
//     { id: 1, name: "John Doe", avatar: "url_to_avatar_1" },
//     { id: 2, name: "Jane Smith", avatar: "url_to_avatar_1" },
//     { id: 3, name: "John Doe", avatar: "url_to_avatar_1" },
//     { id: 4, name: "Jane Smith", avatar: "url_to_avatar_1" },
//     { id: 5, name: "John Doe", avatar: "url_to_avatar_1" },
//     { id: 6, name: "Jane Smith", avatar: "url_to_avatar_1" },
//     { id: 7, name: "John Doe", avatar: "url_to_avatar_1" },
//     { id: 8, name: "Jane Smith", avatar: "url_to_avatar_1" },
//     { id: 9, name: "John Doe", avatar: "url_to_avatar_1" },
//     { id: 10, name: "Jane Smith", avatar: "url_to_avatar_1" },
//     { id: 11, name: "John Doe", avatar: "url_to_avatar_1" },
//     { id: 12, name: "Jane Smith", avatar: "url_to_avatar_1" },
//     { id: 13, name: "Jane Smith", avatar: "url_to_avatar_1" },
//     { id: 14, name: "Jane Smith", avatar: "url_to_avatar_1" },
    
//     // ... Add more users as needed
// ];
// const following = [
//     { id: 1, name: "Sam Smith", avatar: "url_to_avatar_1" },
//     { id: 2, name: "Joe", avatar: "url_to_avatar_2" },
//     // ... Add more users as needed
// ];

function Follow({ title }) {
    const navigate = useNavigate()
    const { profileId } = useParams()
    const [followers, setFollowers] = useState([])

    const handleReturn = () => {
        navigate(`/profile/${profileId}`)
    }

    const fetchFollowers = useCallback(async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/followers`);
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