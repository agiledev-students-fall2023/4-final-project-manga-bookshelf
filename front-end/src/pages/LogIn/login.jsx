import React, { useState } from 'react'

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
        <div class="form-group">
            <button type="submit">Login</button>
        </div>
    </form>
</div>
)
}


export default login;