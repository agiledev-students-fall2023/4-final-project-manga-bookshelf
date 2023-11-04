import express from 'express' 
import mutler from "multer" 
import morgan from "morgan" 
import path from "path" 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//Start Server and specify port 
const app = express()
const port = process.env.PORT ? process.env.PORT : 8080

//Define middleware here
app.use(morgan("dev")) 
app.use(express.json()) 
app.use(express.urlencoded({extended:true})); 
app.use("/static", express.static("public")) 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Sample route 
app.get("/", (req,res)=>{
    res.send("Server is working!!"); 
})

//Sample route which sends back image 
app.get("/puppy", (req,res) => {
    const imagePath = path.join(__dirname, 'public/maltese_puppy.jpeg');
    // Send the image file to the client
    res.sendFile(imagePath);
})

//Start app 
app.listen(port, () => {
    console.log("App started on port 8080!"); 
}); 
        
        
        
