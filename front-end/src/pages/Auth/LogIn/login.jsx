import React from 'react'

import "./login.css"

function login() {

  return (
    <div class="login-main">
    <h2>Login</h2>
    <form class="login-form">
        <div class="form-group">
            <label>Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
        </div>
        <div class="form-group">
            <label>Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <div>
            <a class="form-group" href="https://www.google.com/">New? Sign Up!</a>
        </div>

        <div class="form-group">
            <button onClick={window.history.replaceState("", "", "/")}>Login</button>
        </div>
    </form>
</div>
)
}


export default login;