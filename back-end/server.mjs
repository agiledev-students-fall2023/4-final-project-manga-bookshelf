import app from "./app.mjs" 

const port = process.env.PORT ? process.env.PORT : 8080

//Start app 
app.listen(port, () => {
    console.log("App started on port 8080!");
}); 

