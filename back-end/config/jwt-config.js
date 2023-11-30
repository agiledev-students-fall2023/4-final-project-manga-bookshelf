import mongoose from "mongoose" 
import UserModel from "../Model/userModel.js"

import passportJWT from "passport-jwt"
const ExtractJwt = passportJWT.ExtractJwt 
const JwtStrategy = passportJWT.Strategy 

import dotenv from 'dotenv' 
dotenv.config() 

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), 
    secretOrKey: process.env.JWT_SECRET, 
}

//define the method that is used by passport to verify the contents of the token 
const jwtVerifyToken = async function (jwt_payload, next){
    console.log("JWT Payload received,", jwt_payload) 

    //check if token has expired 
    const expirationDate = newDate(jwt_payload.exp * 1000)
    if (expirationDate < newDate()){
        return next(null, false, {message: "JWT has expired"})
    }
    
    //find the user in the database 
    const userId = ObjectId(jwt_payload.id) //convert string id to objectid
    const user = await UserModel.findOne({_id: userId}).exec() 
    if (user) {
        next(null, user) 
    } else{
        next(null, false, {message : "User not found"})
    }
}

//define the passport strategy that we want to use for jwt 
const jwtStrategy = jwtOptions => {
    const strategy = new JwtStrategy(jwtOptions, jwtVerifyToken)
    return strategy 
}

export default jwtStrategy(jwtOptions, jwtVerifyToken) 
