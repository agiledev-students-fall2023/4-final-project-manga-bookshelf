import React from 'react'

import "./login.css"

function login() {

  function handleSubmit(e){
    e.preventDefault() 
    console.log(e.target.username.value, e.target.password.value)

    fetch("")
  }

  return (
    <div className="login-main">
        <h2>Login</h2>
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
        </form>
    </div>
)
}


export default login;