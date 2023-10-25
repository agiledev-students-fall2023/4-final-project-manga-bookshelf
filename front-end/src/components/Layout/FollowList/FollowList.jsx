import React from 'react'
import UserItem from '../../Elements/UserItem/UserItem'

import "./FollowList.css"

function FollowList({ title, users }) {
    return (
        <div className='follow-list'>
            <h2>{title}</h2>
            <div className='follow-list-content'>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <UserItem user={user}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FollowList