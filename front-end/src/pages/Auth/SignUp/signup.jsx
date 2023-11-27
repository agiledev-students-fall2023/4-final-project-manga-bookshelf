// import React, { useState, useContext} from "react";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import { redirect } from "react-router-dom";

// import "./signup.css"; 

// import { AuthContext } from '../../../context/AuthContext'
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
  // const navigate = useNavigate();
  // const auth = useContext(AuthContext) 

//   const [email, setEmail] = useState("");
//   const [hasTypedEmail, setHasTypedEmail] = useState(false);
//   const [password, setPassword] = useState("");
//   const [passwordConf, setPasswordConf] = useState("");
//   const [hasTypedPassword, setHasTypedPassword] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasTypedPasswordConf, setHasTypedPasswordConf] = useState(false);

//   const invalidPunctuation = ["=", "&", "_", "'", "-", "+", ",", "<", ">"];
//   const regex = /\.{2,}/; // Regular expression to match two or more consecutive periods
//   const emailIsDisabled = (email) =>
//     !email.includes("@") ||
//     invalidPunctuation.some((character) => email.indexOf(character) !== -1) ||
//     regex.test(email);

//   const handleClick = (e) => {
//     e.preventDefault();

//     if (password !== passwordConf) { 
//       setError("Passwords do not match");
//     } else if (emailIsDisabled(email)) {
//       setError("Invalid email");
//     } else if (hasTypedPassword && hasTypedPasswordConf && hasTypedEmail) {
//       navigate("/login");
//     }
//     //this needs to be redone
//   };

//   async function handleSignup(e){
//     e.preventDefault() 
//     console.log(e.target.username.value) 
//     console.log(e.target.email.value) 
//     console.log(e.target.password.value) 
//     await auth.signup(e.target.email.value, e.target.username.value, e.target.password.value)
//     navigate("/")
//   }

//   return (
//     <div class="signup-main">
//       <h2>Sign Up</h2>
//       {error && (
//         <Alert severity="error">
//           <AlertTitle>Error</AlertTitle>
//           {error}
//         </Alert>
//       )}
//       <form onSubmit={handleSignup}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Enter your first name"
//             required
//           />
//         </div>
//         <div>
//             <label>Email:</label>
//             <input
//               type="text"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               required
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setHasTypedEmail(true);
//               }}
//             />
//         </div>
//         <div>
//           <label>Set Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter your password"
//             required
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setHasTypedPassword(true);
//             }}
//           />
//         </div>
//         <div>
//           <a href="/auth/login">Already have acocunt? Login here</a>
//         </div>
//         <div>
//           <button>Sign Up!</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Image from "../../../assets/background2.jpg"
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Signup() { //TODO: connect to the actual thingie up top

  const navigate = useNavigate();
  const auth = useContext(AuthContext)

  async function handleSubmit(e){
    e.preventDefault();
      const data = new FormData(e.currentTarget);
      console.log({
        email: data.get('email'),
        username: data.get('username'), 
        password: data.get('password'),
      });
      await auth.signup(data.get('email'), data.get('username'), data.get('password'))
      navigate("/")
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h4" variant="h4">
              Manga BookShelf 
            </Typography>
            <Typography component="h1" variant="h5">
              Signup
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/reset-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/login" variant="body2">
                    {"Have an Account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}