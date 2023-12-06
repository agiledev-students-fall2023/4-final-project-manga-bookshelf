import express from 'express'
import passport from 'passport' 
import cors from 'cors'

import UserModel from '../Model/userModel.js';
import UserService from '../Service/userService.js';

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

    router.get("/user/get/currentuser", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        res.json({
            success: true,
            message: `Success. Valid JWT for user: ${req.user.username}`,
            user: req.user,
            id: req.user.id
        });
        next();
    })
    
    router.get("/user/get/anotheruser/:username", passport.authenticate("jwt", { session: false }), UserService.getUserData)

    //Give new information to the bio in the format: {payload: "content"}
    router.post("/user/add/bio", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        const content = req.body.payload; 
        const id = req.user.id; 
        UserModel.findByIdAndUpdate(id, {"bio": content})
            .then(docs => {
                console.log("Updated bio:", docs.bio)
                res.json({
                    success:true,
                    message: "Bio updated"
                })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: "Failed to update bio"
                });
            })
    })

    //User Uploads a picture to their bio 
    router.post("/user/add/profilepic", passport.authenticate("jwt", {session: false}), (res,req,next) => {
        next(); 
        // const picture = req.body.payload; 
    })

    // add favorite manga entry
    // pass in through req.body an object of the following: 
    // {
    //     title: asjdfkl
    //     authorName: ajksldf
    //     authorImage: ajksldf
    //     image: asdf
    //     __id: asldkjf
    // }
    router.post("/user/add/favorite", passport.authenticate("jwt", { session: false }), (req, res) => {
        const userId = req.user.id;
        const mangaObject = req.body;
        //find user by  id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }
            
                // Check if the manga is already a favorite
                const isAlreadyFavorite = user.favorite.some(fav => String(fav.__id) === String(mangaObject.__id));

                if (isAlreadyFavorite) {
                    return res.json({ success: false, message: "Manga already in favorites" });
                }

                // Add the new favorite
                user.favorite.push(mangaObject);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "Favorite added successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error adding favorites" });
            });
    });

    
    //remove favorite manga entry
    router.delete("/user/delete/favorite/:id", passport.authenticate("jwt", { session: false }), cors(), (req, res, next) => {
        const userId = req.user.id;
        const mangaId = req.params.id
        //find user by id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                // Check if the manga exists
                const exists = user.favorite.some(fav => String(fav.__id) === String(mangaId));
                if (!exists) {
                    return res.json({ success: false, message: "Manga does not exist in favorite"});
                }

                // Add the new favorite
                user.favorite = user.favorite.filter(manga => String(manga.__id) !== String(mangaId));

                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "Favorite removed Successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error removing favorites" });
            });
    })

    //add currentlyreading 
    router.post("/user/add/currentlyreading", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO. 
        // 1. check to make sure it's not already a favorite
        // 2. if not already a favorite add it to the array. 
        const userId = req.user.id;
        const mangaObject = req.body;

        //find user by  id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                // Check if the manga is already a favorite
                const isAlreadyFavorite = user.currentlyReading.some(cur => cur.__id === mangaObject.__id);

                if (isAlreadyFavorite) {
                    return res.json({ success: false, message: "Manga already in currentlyReading" });
                }

                // Add the new favorite
                user.currentlyReading.push(mangaObject);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "currentlyReading added successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error adding favorites" });
            });
    })

    //remove currentlyreading 
    router.delete("/user/delete/currentlyreading/:id", passport.authenticate("jwt", { session: false }), cors(), (req, res, next) => {
        const userId = req.user.id;
        const mangaId = req.params.id

        //find user by id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                // Check if the manga exists
                const exists = user.currentlyReading.some(fav => fav.__id === mangaId);

                if (!exists) {
                    return res.json({ success: false, message: "Manga does not exist in currentlyreading" });
                }

                // Add the new favorite
                user.currentlyReading = user.currentlyReading.filter(manga => manga.__id !== mangaId);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "currentlyreading removed Successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error removing favorites" });
            });
    })

    ///
    //add finishedreading 
    router.post("/user/add/finishedreading", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        // TODO. 
        // 1. check to make sure it's not already a favorite
        // 2. if not already a favorite add it to the array. 
        const userId = req.user.id;
        const mangaObject = req.body;

        //find user by  id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                // Check if the manga is already a favorite
                const isAlreadyFavorite = user.finishReading.some(fav => fav.__id === mangaObject.__id);

                if (isAlreadyFavorite) {
                    return res.json({ success: false, message: "Manga already in favorites" });
                }

                // Add the new favorite
                user.finishReading.push(mangaObject);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "finishReading added successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error adding finishReading" });
            });
        next();
    })

    //remove finishedreading 
    router.delete("/user/delete/finishedreading/:id", passport.authenticate("jwt", { session: false }), cors(), (req, res, next) => {
        const userId = req.user.id;
        const mangaId = req.params.id

        //find user by id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                // Check if the manga exists
                const exists = user.finishReading.some(fin => fin.__id === mangaId);

                if (!exists) {
                    return res.json({ success: false, message: "Manga does not exist in finishedreading" });
                }

                // Add the new favorite
                user.finishReading = user.finishReading.filter(manga => manga.__id !== mangaId);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "finishedreading removed Successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error removing finishedreading" });
            });
    })

    //add browsinghistory 
    router.post("/user/add/browsinghistory", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        const userId = req.user.id;
        const mangaObject = req.body;

        //find user by  id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                // Check if the manga is already a favorite
                const isAlreadyFavorite = user.browsingHistory.some(his => his.__id === mangaObject.__id);

                if (isAlreadyFavorite) {
                    return res.json({ success: false, message: "Manga already in browsingHistory" });
                }

                // Add the new favorite
                user.browsingHistory.push(mangaObject);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "browsingHistory added successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error adding browsingHistory" });
            });
    })

    //remove browsinghistory 
    router.delete("/user/delete/browsinghistory/:id", passport.authenticate("jwt", { session: false }), cors(), (req, res, next) => {
        const userId = req.user.id;
        const mangaId = req.params.id

        //find user by id first 
        UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                // Check if the manga exists
                const exists = user.browsingHistory.some(his => his.__id === mangaId);

                if (!exists) {
                    return res.json({ success: false, message: "Manga does not exist in browsingHistory" });
                }

                // Add the new favorite
                user.browsingHistory = user.browsingHistory.filter(manga => manga.__id !== mangaId);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "browsingHistory removed Successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error removing browsingHistory" });
            });
    })

    //change the user to admin or user
    router.post("/user/edit/role/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
        console.log("right now it doesn't do anything") 
        next();
    })

    return router 
}

export default protectedRoutes