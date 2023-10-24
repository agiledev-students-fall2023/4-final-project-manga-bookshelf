import React from 'react'
import UserItem from '../../Elements/UserItem/UserItem'

// Currently without styling

function FollowList({ title, users }) {
    return (
        <div className='follow-list'>
        <h2>{title}</h2>
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <UserItem user={user}/>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default FollowList