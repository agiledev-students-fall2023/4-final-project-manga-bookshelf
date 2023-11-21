import express from "express" 
import mongoose from "mongoose" 
import UserModel from "../Model/userModel.js"

const authenticationRouter = () => {
    const router = express.Router(); 

    router.post("/signup", async (req, res, next) => {
        //email might or might not work 
        const username = req.body.username; 
        const password = req.body.password; 
        const email = req.body.email; 

        if (!username || !password){
            res.status(401).json({
                success: false, 
                message: "No username or password", 
            })
            next(); 
        }
        // try to create a new user right now 
        try{    
            const user = await new UserModel({ username, password }).save(); 

            console.error(`New user: ${user}`)

            const token = user.generateJWT(); //create a signed token 
            res.json({
                success: true, 
                message: "user saved successfully", 
                token: token, 
                username: user.username, 
            }); // send the token to the client to store 
            next(); 
        } catch (err){
            console.log(`Failed to save user: ${err}`); 
            next(); 
        }
    })

    router.post("/login", async function (req, res, next){
        const username = req.body.username; 
        const password = req.body.password; 
        console.log("username", username)
        console.log("password", password)

        if (!username || !password){
            res.status(401).json({success: false, message: "No username or password supplied"})
            next(); 
        }

        //find this user in the db 
        try{ 
            const user = await UserModel.findOne({ username: username }).exec(); 
            if (!user){
                console.log("User not found") 
                res.send("User not found")
                next(); 
            }
            else if (!user.validPassword(password)) { 
                console.log("Incorrect Password") 
                res.send("In correct Password")
                next() 
            }

            console.log("User logged successful") 
            const token = user.generateJWT(); 
            res.json({
                success: true, 
                message: "User logged in successfully.", 
                token: token, 
                username: user.username, 
            })
            next();
        } catch (err) {
            console.log("error looking up user:",err) 
            next(); 
        }
    })

    router.get("/logout", function (req,res,next) {
        // nothing really to do here... logging out with JWT authentication is handled entirely by the front-end by deleting the token from the browser's memory
        res.json({
            success: true, 
            message: "nothing to really do here"
        });
        next(); 
    })

    return router
}

export default authenticationRouter; 