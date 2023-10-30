import React from 'react'

import "../LogIn/login.css"

//1. email works
//2. passwords match 

function signup() {

  return (
    <div class="login-main">
    <h2>Sign Up</h2>
    <form class="login-form">
        <div class="form-group">
            <label>First Name:</label>
            <input type="text" id="username" name="username" placeholder="Enter your first name" required />
        </div>
        <div class="form-group">
            <label>Last Name:</label>
            <input type="text" id="username" name="username" placeholder="Enter your last name" required />  
        </div>
        <div>
        <div class="form-group">
            <label>Email:</label>
            <input type="text" id="username" name="username" placeholder="Enter your email" required />  
        </div>
        </div>
        <div class="form-group">
            <label>Set Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <div class="form-group">
            <label>Confirm Password:</label>
            <input type="password" id="password" name="password" required />
        </div>
        <div class="form-group">
            <button onClick={window.history.replaceState("", "", "/login")}>Sign Up!</button>
        </div>
    </form>
</div>
)
}


export default signup;