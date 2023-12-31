import express from 'express' 
const app = express() //start server

import mutler from "multer" 
import morgan from "morgan" 
import url from 'url';
import path from 'path';
import cors from "cors" 
import userRouter from './Controller/userController.js'
import mangaRouter from './Controller/mangaController.js'
import commentRouter from './Controller/commentController.js'
import forumRouter from './routes/forum-route.js';
import forumData from './public/MockComments.json' assert { type: 'json' };
import sampleProfileList from "./public/sampleProfileList.json" assert { type: 'json' }
import sampleProfileData from "./public/sampleProfileData.json" assert { type: 'json' }

//use jwt strategy for auth 
import passport from "passport"
import jwtStrategy from "./config/jwt-config.js" 
passport.use(jwtStrategy) //use this jwt strategy within passport for authentication handling
app.use(passport.initialize()) //use the passport middleware 

import mongoose from "mongoose" 
import UserModel from './Model/userModel.js';

// connect to the database
mongoose.connect(process.env.DATABASE_URI).then(()=>{
    console.log("connected to MongonDB Atlas")
}).catch((err) => {
    console.log("Error:", err)
})

//Define middleware to use here
app.use(morgan("dev")) 
app.use(cors({
    "origin": process.env.FRONTEND_ROUTE,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "allowHeaders": ['Content-Type', 'Authorization'],
    "optionsSuccessStatus": 204
})) 
app.use(express.json()) 
app.use(express.urlencoded({extended:true})); 
app.use("/static", express.static("public"))

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Sample route 
app.get("/", (req,res)=>{
    res.send("Server is working!!"); 
})

//auth routes 
import authenticationRouter from "./routes/authentication-route.js"
import protectedRoutes from './routes/protected-routes.js';

app.use("/auth", authenticationRouter())
app.use("/protected", protectedRoutes())
app.use("/forum", forumRouter())

app.use(`/manga`, mangaRouter)
app.use(`/user`, userRouter)
app.use(`/comment`, commentRouter)


//other stuff (should put this in router) 
app.get(`/comment/MockComments`, (req, res) => {
    res.json(forumData);
});

app.get('/getProfileLists', (req,res) => {
    res.json(sampleProfileList);
})

export default app; 