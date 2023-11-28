import express from 'express'
import passport from 'passport' 

const protectedRoutes = () => {
    const router = express.Router(); 

    //Gets current user data
    router.get("/user/get/currentuser", passport.authenticate("jwt", {session: false}), (req,res,next) => {
        res.json({
            success: true, 
            message: `Success. Valid JWT for user: ${req.user.username} `, 
            user: req.user, 
        });
        next(); 
    })

    //Give new information to the bio
    router.post("/user/add/bio", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        //TODO: 
        // 0. use req.user to get the user from the database 

        // Change the bio 
        next();
    })

    //update bio 
    router.post("/user/edit/bio", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        //TODO: 
        // 0. use req.user to get the user from the database 
        // Change the bio 
        next();
    })

    //add favorite manga entry
    router.post("/user/add/favorite/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO. 
        // 0. use req.user to get the user from the database 
        // 1. check to make sure it's not already a favorite 
        // 2. if not already a favorite add it to the array. 

        // res.json({
        //     success: true,
        //     user: {
        //         id: req.user.id,
        //         username: req.user.username,
        //     },
        //     message: "You have a valid JWT so you're able to access this route",
        // });
        next();
    })

    //remove favorite manga entry
    router.post("/user/delete/favorite/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO: 
        // 1. check to make sure the manga entry aleady exists (error if not)
        // 2. if it's there remove it 
        console.log("removing favorite of id:", req.params.id)
        next();
    })

    //add currently reading 
    router.post("/user/add/currentlyreading/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO. 
        // 1. check to make sure it's not already a favorite
        // 2. if not already a favorite add it to the array. 
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

    //reove currently reading 
    router.post("/user/delete/currentlyreading/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO: 
        // 1. check to make sure the currently reading manga entry aleady exists (error if not)
        // 2. if it's there remove it 
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

    ///
    //add finished reading 
    router.post("/user/add/finishedreading/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO. 
        // 1. check to make sure it's not already a favorite
        // 2. if not already a favorite add it to the array. 
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

    //reove currently reading 
    router.post("/user/delete/finishedreading/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO: 
        // 1. check to make sure the currently reading manga entry aleady exists (error if not)
        // 2. if it's there remove it 
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

    //add finished reading 
    router.post("/user/add/browsinghistory/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO. 
        // 0. use req.user to get the user from the database 
        // 1. check to make sure it's not already a favorite
        // 2. if not already a favorite add it to the array. 
        next();
    })

    //remove currently reading 
    router.post("/user/delete/browsinghistory/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO: 
        // 0. use req.user to get the user from the database 
        // 1. check to make sure the currently reading manga entry aleady exists (error if not)
        // 2. if it's there remove it 
        next();
    })

    //change the user to admin or user
    router.post("/user/edit/role/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
       console.log("right now it doesn't do anything") 
        next();
    })

    return router 
}

export default protectedRoutes