import express from 'express' 
const app = express() //start server

import dotenv from "dotenv" 
dotenv.config() 
import mutler from "multer" 
import morgan from "morgan" 
import url from 'url';
import path from 'path';
import cors from "cors" 
import userRouter from './Controller/userController.js'
import mangaRouter from './Controller/mangaController.js'
import forumData from './public/MockComments.json' assert { type: 'json' };
import commentController from './Controller/commentController.js'

import sampleProfileList from "./public/sampleProfileList.json" assert { type: 'json' }
import sampleProfileData from "./public/sampleProfileData.json" assert { type: 'json' }

//use jwt strategy for auth 
import jwt from "jsonwebtoken" 
import passport from "passport"
import jwtStrategy from "./config/jwt-config.js" 
passport.use(jwtStrategy) //use this jwt strategy within passport for authentication handling
app.use(passport.initialize()) //use the passport middleware 

import mongoose from "mongoose" 
import UserModel from './Model/userModel.js';

// connect to the database
// console.log(`Conneting to MongoDB at ${process.env.MONGODB_URI}`)
mongoose.connect(process.env.DATABASE_URI).then(()=>{
    console.log("connected to MongonDB Atlas")
}).catch((err) => {
    console.log("Error:", err)
})

//Define middleware to use here
app.use(morgan("dev")) 
app.use(cors()) 
app.use(express.json()) 
app.use(express.urlencoded({extended:true})); 
app.use("/static", express.static("public"))

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define the constant routes 
const BASE_ROUTE_AUTH = "auth"
const BASE_ROUTE_MANGA = "manga" 
const BASE_ROUTE_USER = "user"
const BASE_ROUTE_COMMENT = "comment"

//Sample route 
app.get("/", (req,res)=>{
    res.send("Server is working!!"); 
})

//auth routes 
import authenticationRouter from "./routes/authentication-route.js"
import protectedRoutes from './routes/protected-routes.js';

app.use("/auth", authenticationRouter())
app.use("/protected", protectedRoutes())

app.use(`/${BASE_ROUTE_MANGA}`, mangaRouter)

app.use(`/${BASE_ROUTE_USER}`, userRouter)

//other stuff
/*
app.get(`/${BASE_ROUTE_COMMENT}/MockComments`, (req, res) => {
    res.json(forumData);
  });
*/
// comment routes
app.get(`/${BASE_ROUTE_COMMENT}/comments`, commentController.getAllComments);
app.get(`/${BASE_ROUTE_COMMENT}/comments/:commentId`, commentController.getCommentById);
app.post(`/${BASE_ROUTE_COMMENT}/comments/save`, commentController.saveComment);
app.get(`/${BASE_ROUTE_COMMENT}/grouped`, commentController.getCommentsByTopic);

app.get('/getProfileLists', (req,res) => {
    res.json(sampleProfileList);
})

export default app; 
