import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

import "./signup.css"; 

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [hasTypedEmail, setHasTypedEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [error, setError] = useState(null);
  const [hasTypedPasswordConf, setHasTypedPasswordConf] = useState(false);

  const invalidPunctuation = ["=", "&", "_", "'", "-", "+", ",", "<", ">"];
  const regex = /\.{2,}/; // Regular expression to match two or more consecutive periods
  const emailIsDisabled = (email) =>
    !email.includes("@") ||
    invalidPunctuation.some((character) => email.indexOf(character) !== -1) ||
    regex.test(email);

  const handleClick = (e) => {
    e.preventDefault();

    if (password !== passwordConf) {
      setError("Passwords do not match");
    } else if (emailIsDisabled(email)) {
      setError("Invalid email");
    } else if (hasTypedPassword && hasTypedPasswordConf && hasTypedEmail) {
      navigate("/login");
    }
  };

  return (
    <div class="signup-main">
      <h2>Sign Up</h2>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <form>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
            <label>Email:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                setHasTypedEmail(true);
              }}
            />
        </div>
        <div>
          <label>Set Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setHasTypedPassword(true);
            }}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Confirm your password"
            required
            onChange={(e) => {
              setPasswordConf(e.target.value);
              setHasTypedPasswordConf(true);
            }}
          />
        </div>
        <div>
          <button onClick={(e) => handleClick(e)}>Sign Up!</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
