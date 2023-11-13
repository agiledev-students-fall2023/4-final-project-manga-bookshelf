import express from 'express' 
import mutler from "multer" 
import morgan from "morgan" 
import url from 'url';
import path from 'path';
import cors from "cors" 
import UserController from './Controller/userController.js';
import * as Jikan from "./helpers/Jikan.js" //import helper function that we want to use
import * as User from "./helpers/User.js"
import forumData from './public/MockComments.json' assert { type: 'json' };

//Start Server and specify port 
import sampleProfileList from "./public/sampleProfileList.json" assert { type: 'json' }
import sampleProfileData from "./public/sampleProfileData.json" assert { type: 'json' }
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
const BASE_ROUTE_COMMENT = "comment"

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

//send result back with result json 
app.get(`/${BASE_ROUTE_MANGA}/search/:entry`, async (req, res) => {
    const payload = await Jikan.getMangaSearch(req.params.entry)
    res.json({result: payload})
})

//send result back with array
app.get(`/${BASE_ROUTE_MANGA}/search2/:entry`, async (req, res) => {
    const payload = await Jikan.getMangaSearch(req.params.entry)
    res.json(payload)
})

app.get(`/${BASE_ROUTE_MANGA}/search/id/:id`, async (req, res) => {
    const payload = await Jikan.getMangaInfoById(req.params.id);
    res.json({result: payload})
})

app.get(`/${BASE_ROUTE_MANGA}/search2/id/:id`, async (req, res) => {
    const payload = await Jikan.getMangaInfoById(req.params.id);
    res.json(payload)
})

app.get(`/${BASE_ROUTE_MANGA}/mangasearch/:entry`, async (req, res) => {
    //get the top manga's id
    const mangaId = await Jikan.getTopMangaId(req.params.entry) 
    //get that manga's info using the id
    const payload2 = await Jikan.getMangaInfoById(mangaId) 
    res.json(payload2)
})

// Need to set up route which gives a recommendation based on a specific entry (like action, romance, etc)
app.get(`/${BASE_ROUTE_MANGA}/recommendation/:num`, async (req, res) => {
    const payload = await Jikan.getMangaRecommendations(req.params.num)
    res.json({result: payload})  
})

app.get(`/${BASE_ROUTE_MANGA}/recommendation/genre/:genreName`, async (req, res) => {
    const genres = await Jikan.getMangaInfoByGenres(req.params.genreName);
    res.json({ result: genres });
})

app.get(`/${BASE_ROUTE_USER}/:id/followers`, async (req, res) => {
    const followers = await User.getUserFollower(req.params.id);
    res.json({ result: followers });
})
app.get(`/${BASE_ROUTE_MANGA}/recommendation/genre/:genreName`, async (req, res) => {
    const genres = await Jikan.getMangaInfoByGenres(req.params.genreName);
    res.json({ result: genres });
})

app.get(`/${BASE_ROUTE_USER}/:id/followers`, UserController.getUserFollower)

// to follow a user
app.post(`/${BASE_ROUTE_USER}/:id/follow`, async (req, res) => {
    await User.followUser(req.params.id, req.body.followingId)
    res.send('seccess follow')
})

// to unfollow a user
app.post(`/${BASE_ROUTE_USER}/:id/unfollow`, async (req, res) => {
    await User.unfollowUser(req.params.id, req.body.unfollowingId)
    res.send('success unfollow')
})

// to remove a user
app.post(`/${BASE_ROUTE_USER}/:id/remove`, async (req, res) => {
    // await User.removeUser(req.params.id)
    // await User.unfollowUser(req.params.id, req.body.removingId)
    await User.removeUser(req.params.id, req.body.removingId)
    res.send('success remove')
})

app.get(`/${BASE_ROUTE_COMMENT}/MockComments`, (req, res) => {
    res.json(forumData);
  });

//get the profile lists 
app.get(`/${BASE_ROUTE_USER}/:id/profileInfo`, UserController.getUserData)

app.get('/getProfileLists', (req,res) => {
    res.json(sampleProfileList);
})

export default app; 
