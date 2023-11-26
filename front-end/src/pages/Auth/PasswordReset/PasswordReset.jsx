import React, { useState, useContext} from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import './PasswordReset.css';

import { AuthContext } from '../../../context/AuthContext'

function PasswordReset() {
  
  const auth = useContext(AuthContext) 

  const [sentEmail, setSentEmail] = useState(false);
  const handleClose = () => {
    setSentEmail(false);
  };

  const handleSubmit = (e) => {
    console.log(e.target.email.value)
  }

  return (
    <div className="passwordreset-container">
      {sentEmail && (
        <Alert severity="success" onClose={handleClose}>
          <AlertTitle>Success</AlertTitle>
          Email sent successfully! Please check your email.
        </Alert>
      )}
      <h2>Forgot Password</h2>
      <p>
        Enter your email address to verify your email and reset your password.
      </p>
      <form id="forgotPasswordForm" onsubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
        <br></br>
        <div>
          <a href="/auth/login">Login</a>
        </div>
        <button type="button" onClick={() => setSentEmail(true)}>
          Verify Email!
        </button>
      </form>
    </div>
  );
}

export default PasswordReset;
