import React, {useState} from 'react'
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';


import "../LogIn/login.css"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [hasTypedEmail, setHasTypedEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [hasTypedPasswordConf, setHasTypedPasswordConf] =
    useState(false);
    const invalidPunctuation = ["=", "&", "_", "'", "-", "+", ",", "<", ">"];
    const regex = /\.{2,}/; // Regular expression to match two or more consecutive periods
    const emailIsDisabled = (email) => !email.includes("@") || 
      invalidPunctuation.some((character) => email.indexOf(character) !== -1) ||
      regex.test(email);

  const handleClick = () => {
    if(password !== passwordConf) {
        //replace with alerts!
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
        console.log("passwords bad");
    }
    else if(emailIsDisabled(email)) {
        //replace with alerts!
        console.log(emailIsDisabled);
    }
    else if(hasTypedPassword && hasTypedPasswordConf && hasTypedEmail) {
        window.history.replaceState("", "", "/login");
    }
  }

  return (
    <div class="login-main">
    <h2>Sign Up</h2>
    <form class="login-form">
        <div class="form-group">
            <label>First Name:</label>
            <input type="text" id="username" name="username" placeholder="Enter your first name" required
            />
        </div>
        <div class="form-group">
            <label>Last Name:</label>
            <input type="text" id="username" name="username" placeholder="Enter your last name" required 
            />  
        </div>
        <div>
        <div class="form-group">
            <label>Email:</label>
            <input type="text" id="username" name="username" placeholder="Enter your email" required 
                onChange={(e) => {
                    setEmail(e.target.value);
                    setHasTypedEmail(true);
                }}
            />  
        </div>
        </div>
        <div class="form-group">
            <label>Set Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required 
                onChange={(e) => {
                    setPassword(e.target.value);
                    setHasTypedPassword(true);
                }}
            />
        </div>
        <div class="form-group">
            <label>Confirm Password:</label>
            <input type="password" id="password" name="password" placeholder="Confirm your password" required
            onChange={(e) => {
                setPasswordConf(e.target.value);
                setHasTypedPasswordConf(true);
            }} />
        </div>
        <div class="form-group">
            <button onClick={handleClick()}>Sign Up!</button>
        </div>
    </form>
</div>
)
}


export default SignUp;