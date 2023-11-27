// import React, {useState, useContext} from 'react'

// import "./login.css"

// import { AuthContext } from '../../../context/AuthContext'
// import { useNavigate } from "react-router-dom";

// function Login() {
//  //local username and password
//   const [username, setUsername] = useState("") 
//   const [password, setPassword] = useState("") 

//   const auth = useContext(AuthContext) 
//   const navigate = useNavigate();

//   async function handleSubmit(e){
//     e.preventDefault() 
//     console.log(e.target.username.value, e.target.password.value)
//     const result = await auth.signin(e.target.username.value, e.target.password.value) 
//     console.log(auth.user) 
//     console.log(result) 
//     console.log(JSON.parse(localStorage.getItem('user')))
//     navigate('/')
// }

//     // {
//     //     "success": true,
//     //         "message": "User logged in successfully.",
//     //             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWM1NzNiOTAwN2I1ZDNhN2RlM2I1YSIsInVzZXJuYW1lIjoicm9iMTIzIiwiZXhwIjoxOTI4NjEyNzkzLCJpYXQiOjE3MDEwMzUxOTN9.KJ7i5ypA9HmlAZPtfA4NhQlepHmLk7vf2OsmrcOI0PM",
//     //                 "username": "rob123"
//     // }
//   return (
//     <div className="login-main">
//         <h2>Manga Bookshelf Login</h2>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Username:</label>
//                 <input type="text" id="username" name="username" placeholder="Enter your username" required />
//             </div>
//             <div>
//                 <label>Password:</label>
//                 <input type="password" id="password" name="password" placeholder="Enter your password" required />
//             </div>
//             <div>
//                 <a href="/auth/SignUp">New? Sign Up!</a>
//             </div>
//             <div>
//                 <a href="/auth/reset-password">Forget Password? Reset Password here</a>
//             </div>
//             <div>
//                 <button onClick={window.history.replaceState("", "", "/")}>Login</button>
//             </div>
//             {
//                 auth.error ?? <div>{auth.error}</div>
//             }
//         </form>
//     </div>
// )
// }


// export default Login;

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from "react-router-dom";
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

import Image from "../../../assets/background1.png"


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const auth = useContext(AuthContext) 
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const result = await auth.signin(data.get('username'), data.get('password'))
        console.log(result) 
        console.log(JSON.parse(localStorage.getItem('user')))
        navigate('/')
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                                    <Link href="/auth/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
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