import mongoose from 'mongoose'
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken" 
import jwtStrategy from "../config/jwt-config.js" 

const UserSchema = new mongoose.Schema({
    username: {
        type:String, 
        unique: true, 
        required:true, 
    },
    email: {
        type:String, 
        unqiue: true, 
        required: false, 
    },
    password: {
        type:String, 
        required:true,
    },
    profileImg:
    {
        // type: String,
        // default: "https://placekitten.com/g/200/200"
        data: Buffer, 
        contentType: String, 
    },
    twitter:
    {
        // Add social media links here
        type: String,
        default: "your_handle"
    },
    bio:{
        type: String, 
        default: ""
    },
    favorite:{
        type: [mongoose.Schema.Types.Object], 
        ref: "Manga"
    },
    wantReading:{
        type: [mongoose.Schema.Types.Object],
        ref: "Manga"
    },
    currentlyReading:{
        type: [mongoose.Schema.Types.Object],
        ref: "Manga"
    },
    finishReading:{
        type: [mongoose.Schema.Types.Object],
        ref: "Manga"
    }, 
    browsingHistory:{
        type: [mongoose.Schema.Types.Object],
        ref: "Manga"
    }, 
    // mnagaTracker:{
    //     type: [mongoose.Schema.Types.Object],
    //     ref: "object"
    // }, 
    role: {
        type: String,
        default: 'user',
    },
    follower: {
        // currently add 'bob' to default just for testing
        type: [],
        default: []
    },
    following: {
        // currently add 'bob' to default just for testing
        type: [],
        default: []
    },
})

//hash the password before the user is saved 
UserSchema.pre("save", function (next) {
    const user = this
    // if the password has not changed, no need to hash it
    if (!user.isModified("password")) {
        return next()
    }
    // otherwise, the password is being modified, so hash it
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err)
        user.password = hash // update the password to the hashed version
        next()
    })
})

//--------------------------------
// Define a bunch of methods to use 
//--------------------------------

// compare a given password with database hash 
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password) 
}

// return a JWT token for the user 
UserSchema.methods.generateJWT = function() {
    const today = new Date() 
    const exp = new Date(today) 
    exp.setDate(today.getDate() + process.env.JWT_EXP_DAYS)

    return jwt.sign(
        {
            id: this._id, 
            username: this.username,  
            exp: parseInt(exp.getTime() / 1000), 
        },
        process.env.JWT_SECRET
    )
}

// return the user information without sensitive data 
UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username, 
        token: this.generateJWT(), 
    }
}

const UserModel = mongoose.model("User", UserSchema) 

export default UserModel 