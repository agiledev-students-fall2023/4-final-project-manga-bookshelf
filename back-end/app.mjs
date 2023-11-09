import express from 'express' 
import mutler from "multer" 
import morgan from "morgan" 
import url from 'url';
import path from 'path';
import cors from "cors" 
import * as Jikan from "./helpers/Jikan.js" //import helper function that we want to use
import * as User from "./helpers/User.js"

//Start Server and specify port 
import sampleProfileList from "./public/sampleProfileList.json" assert { type: 'json' }
const app = express()

//Define middleware here
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

//Sample route 
app.get("/", (req,res)=>{
    res.send("Server is working!!"); 
})

//Sample route which sends back image 
app.get("/puppy", (req,res) => {
    const imagePath = path.join(__dirname, 'public/maltese_puppy.jpeg');
    res.sendFile(imagePath);
})

app.get(`/${BASE_ROUTE_AUTH}`, (req, res) => {
    res.json({content: "Why not send some json"})
})

app.get(`/${BASE_ROUTE_MANGA}`, (req, res) => {
    res.json({ content: "use this route format to send some json" })
})
app.get(`/${BASE_ROUTE_COMMENT}`, (req, res) => {
    res.json({ content: "Why not send some json again again" })
})

app.get(`/${BASE_ROUTE_MANGA}/search/:entry`, async (req, res) => {
    const payload = await Jikan.getMangaSearch(req.params.entry)
    res.json({result: payload})
})

app.get(`/${BASE_ROUTE_MANGA}/search/id/:id`, async (req, res) => {
    const payload = await Jikan.getMangaInfoById(req.params.id);
    res.json({result: payload})
})

// Need to set up route which gives a recommendation based on a specific entry (like action, romance, etc)

app.get(`/${BASE_ROUTE_MANGA}/recommendation/:num`, async (req, res) => {
    const payload = await Jikan.getMangaRecommendations(req.params.num)
    res.json({result: payload})  
})

//get the profile lists 
app.get(`/getProfileLists`, async (req,res) => {
    res.json(sampleProfileList);
})

//Write more routes here: 

app.get(`/${BASE_ROUTE_USER}/:id/followers`, async (req, res) => {
    const followers = await User.getUserFollower(req.params.id)
    res.json({result: followers})
})

app.get(`/${BASE_ROUTE_USER}/:id/following`, async (req, res) => {
    const following = await User.getUserFollowing(req.params.id)
    res.json({result: following})
})
        
export default app; 
