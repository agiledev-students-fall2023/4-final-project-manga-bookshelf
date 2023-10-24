import { React } from 'react'
import FollowList from '../../components/Layout/FollowList/FollowList'
import { useNavigate, useParams } from 'react-router-dom'

import './follow.css'

// This is for mocking purposes only
const follower = [
    { id: 1, name: "John Doe", avatar: "url_to_avatar_1" },
    { id: 2, name: "Jane Smith", avatar: "url_to_avatar_1" },
    // ... Add more users as needed
];
const following = [
    { id: 1, name: "Sam Smith", avatar: "url_to_avatar_1" },
    { id: 2, name: "Joe", avatar: "url_to_avatar_2" },
    // ... Add more users as needed
];

function Follow({ title }) {
    const users = title === "follower" ? follower : title === "following" ? following : [];

    const navigate = useNavigate(); 
    const { profileId } = useParams();

    const handleReturn = () => {
        navigate(`/profile/${profileId}`);
    }

    return (
        <div className="follow-main">
            <button onClick={handleReturn}>Return to Profile Page</button>
            <FollowList title={title} users={users}/>
        </div>
    )
}

export default Follow