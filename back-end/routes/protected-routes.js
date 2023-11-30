import express from 'express'
import passport from 'passport' 

const protectedRoutes = () => {
    const router = express.Router(); 

    router.get("/", passport.authenticate("jwt", {session: false}), (req,res,next) => {
        res.json({
            success: true, 
            user: {
                id: req.user.id, 
                username: req.user.username, 
            },
            message: "You have a valid JWT so you're able to access this route", 
        });
        next(); 
    })

    return router 
}

export default protectedRoutes