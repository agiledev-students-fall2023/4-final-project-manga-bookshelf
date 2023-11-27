import React, {useState, useContext} from 'react'

import "./login.css"

import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from "react-router-dom";

function Login() {
 //local username and password
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("") 

  const auth = useContext(AuthContext) 
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault() 
    console.log(e.target.username.value, e.target.password.value)
    const result = await auth.signin(e.target.username.value, e.target.password.value) 
    console.log(auth.user) 
    console.log(result) 
    console.log(JSON.parse(localStorage.getItem('user')))
    navigate('/')
}
  
    // {
    //     "success": true,
    //         "message": "User logged in successfully.",
    //             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWM1NzNiOTAwN2I1ZDNhN2RlM2I1YSIsInVzZXJuYW1lIjoicm9iMTIzIiwiZXhwIjoxOTI4NjEyNzkzLCJpYXQiOjE3MDEwMzUxOTN9.KJ7i5ypA9HmlAZPtfA4NhQlepHmLk7vf2OsmrcOI0PM",
    //                 "username": "rob123"
    // }
  return (
    <div className="login-main">
        <h2>Manga Bookshelf Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </div>
            <div>
                <a href="/auth/SignUp">New? Sign Up!</a>
            </div>
            <div>
                <a href="/auth/reset-password">Forget Password? Reset Password here</a>
            </div>
            <div>
                <button onClick={window.history.replaceState("", "", "/")}>Login</button>
            </div>
            {
                auth.error ?? <div>{auth.error}</div>
            }
        </form>
    </div>
)
}


export default Login;