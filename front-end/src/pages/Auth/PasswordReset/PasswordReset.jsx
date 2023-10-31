import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
function PasswordReset() {
  const [sentEmail, setSentEmail] = useState(false);
  const handleClose = () => {
    setSentEmail(false);
  };

  return (
    <div class="container">
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
      <form id="forgotPasswordForm">
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
        <br></br>
        <button type="button" onClick={() => setSentEmail(true)}>
          Verify Email!
        </button>
      </form>
    </div>
  );
}

export default PasswordReset;
