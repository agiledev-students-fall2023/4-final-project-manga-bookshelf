import express from 'express' 

const app = express() 
const port = process.env.PORT ? process.env.PORT : 8080

//Start the app 
app.listen(port, () => {
    console.log("App started on port 8080!"); 
}); 
        
        
        
