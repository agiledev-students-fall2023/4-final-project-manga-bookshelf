// import React, { useState, useContext} from "react";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import './PasswordReset.css';

// import { AuthContext } from '../../../context/AuthContext'

// function PasswordReset() {
  
//   const auth = useContext(AuthContext) 

//   const [sentEmail, setSentEmail] = useState(false);
//   const handleClose = () => {
//     setSentEmail(false);
//   };

//   const handleSubmit = (e) => {
//     console.log(e.target.email.value)
//   }

//   return (
//     <div className="passwordreset-container">
//       {sentEmail && (
//         <Alert severity="success" onClose={handleClose}>
//           <AlertTitle>Success</AlertTitle>
//           Email sent successfully! Please check your email.
//         </Alert>
//       )}
//       <h2>Forgot Password</h2>
//       <p>
//         Enter your email address to verify your email and reset your password.
//       </p>
//       <form id="forgotPasswordForm" onsubmit={handleSubmit}>
//         <input
//           type="email"
//           id="email"
//           placeholder="Enter your email"
//           required
//         />
//         <br></br>
//         <div>
//           <a href="/auth/login">Login</a>
//         </div>
//         <button type="button" onClick={() => setSentEmail(true)}>
//           Verify Email!
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PasswordReset;


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Image from "../../../assets/background3.png"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              Password Reset
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Email
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/login" variant="body2">
                    {"Have an account? Sign in"}
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