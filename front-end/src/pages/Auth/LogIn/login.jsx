import React from 'react'

import "./login.css"

function login() {

  return (
    <div className="login-main">
        <h2>Login</h2>
        <form>
            <div>
                <label>Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </div>
            <div>
                <a href="/SignUp">New? Sign Up!</a>
            </div>
            <div>
                <button onClick={window.history.replaceState("", "", "/")}>Login</button>
            </div>
        </form>
    </div>
)
}


export default login;