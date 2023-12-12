import express from 'express'
import passport from 'passport' 
import cors from 'cors'
import multer from 'multer' 

import UserModel from '../Model/userModel.js';
import UserService from '../Service/userService.js';

const storage = multer.memoryStorage() 
const upload = multer()

// Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Create the multer instance
// const upload = multer({ storage: storage });

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


    router.delete("/user/delete/currentlyreading/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        try {
            const userId = req.user.id;
            const mangaId = req.params.id;
    
            // Find user by id first 
            const user = await UserModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            // Check if the manga exists in currentlyReading
            const mangaIndex = user.currentlyReading.findIndex(entry => Array.isArray(entry) ? entry[0].__id && entry[0].__id.toString() === mangaId : entry.__id && entry.__id.toString() === mangaId);
    
            if (mangaIndex === -1) {
                return res.status(404).json({ success: false, message: "Manga does not exist in currentlyreading" });
            }
    
            // Remove the manga from currentlyReading
            user.currentlyReading.splice(mangaIndex, 1);
    
            // Save the updated user
            await user.save();
    
            // Send success response
            return res.json({ success: true, message: "currentlyreading removed Successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Error removing currentlyReading" });
        }
    });


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
    })


    router.delete("/user/delete/finishedreading/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        try {
            const userId = req.user.id;
            const mangaId = req.params.id;
    
            // Find user by id first 
            const user = await UserModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            // Check if the manga exists in currentlyReading
            const mangaIndex = user.finishReading.findIndex(entry => Array.isArray(entry) ? entry[0].__id && entry[0].__id.toString() === mangaId : entry.__id && entry.__id.toString() === mangaId);
    
            if (mangaIndex === -1) {
                return res.status(404).json({ success: false, message: "Manga does not exist in finishedreading" });
            }
    
            // Remove the manga from currentlyReading
            user.finishReading.splice(mangaIndex, 1);
    
            // Save the updated user
            await user.save();
    
            // Send success response
            return res.json({ success: true, message: "finishedReading removed Successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Error removing finishReading" });
        }
    });

    //add wantreading 
    router.post("/user/add/wantreading", passport.authenticate("jwt", { session: false }), (req, res, next) => {
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
                const isAlreadyFavorite = user.wantReading.some(fav => fav.__id === mangaObject.__id);

                if (isAlreadyFavorite) {
                    return res.json({ success: false, message: "Manga already in wantreading" });
                }

                // Add the new favorite
                user.wantReading.push(mangaObject);

                // Save the updated user
                return user.save();
            })
            .then(() => {
                res.json({ success: true, message: "wantReading added successfully" });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error adding wantReading" });
            });
    })

    router.delete("/user/delete/wantreading/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        try {
            const userId = req.user.id;
            const mangaId = req.params.id;
    
            // Find user by id first 
            const user = await UserModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            // Check if the manga exists in currentlyReading
            const mangaIndex = user.wantReading.findIndex(entry => Array.isArray(entry) ? entry[0].__id && entry[0].__id.toString() === mangaId : entry.__id && entry.__id.toString() === mangaId);
    
            if (mangaIndex === -1) {
                return res.status(404).json({ success: false, message: "Manga does not exist in wantreading" });
            }
    
            // Remove the manga from currentlyReading
            user.wantReading.splice(mangaIndex, 1);
    
            // Save the updated user
            await user.save();
    
            // Send success response
            return res.json({ success: true, message: "wantReading removed Successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Error removing wantReading" });
        }
    });

    router.put("/user/update/chapter/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        try {
            const userId = req.user.id;
            const mangaId = req.params.id;
            const { chapter } = req.body;
    
            console.log("Received PUT request to update chapter. Manga ID:", mangaId, "Chapter:", chapter);
    
            // Find user by id first 
            const user = await UserModel.findById(userId);
    
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            // Check if the manga exists in currentlyReading
            const mangaEntry = user.currentlyReading.find(entry => entry.__id.toString() === mangaId);
            console.log(mangaEntry)
    
            if (!mangaEntry) {
                console.log("Manga not found in currentlyReading");
                return res.status(404).json({ success: false, message: "Manga does not exist in currentlyreading" });
            }
    
            // Update the chapter in currentlyReading
            mangaEntry.chapter = chapter;
    
            console.log(mangaEntry)
            // Save the updated user
            await user.save();
    
            console.log("Chapter updated successfully");
            // Send success response
            return res.json({ success: true, message: "Chapter updated successfully" });
            
        } catch (err) {
            console.error("Error updating chapter:", err);
            return res.status(500).json({ success: false, message: "Error updating chapter" });
        }
    });

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

    //change user profile
    router.post("/user/edit/username/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        try {
          const response = await UserService.changeUser(req, res);

          next();
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Error updating user" });
        }
      });
    
      // Update the route to use UserService.changeBio
      router.post("/user/edit/bio/:id", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        try {
          await UserService.changeBio(req, res);
          next();
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Error updating bio" });
        }
      });
    

    router.get("/user/get/profileImage", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        try{
            if (!req.user || !req.user.profileImg) {
                return res.status(404).json({ success: false, message: 'User or profile image not found' });
              }

            res.set('Content-Type', req.user.profileImg.contentType);
            res.send(req.user.profileImg.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error retrieving profile image', error });
        }
    })

      // Update the route to use UserService.changeProfileImage
      router.post("/user/edit/profileImage/:id", upload.single('profileImage'), passport.authenticate("jwt", { session: false }), async (req, res, next) => {
        // try {
        //   console.log("Does this work?!",req.file)
        //   await UserService.changeProfileImage(req, res);
        //   next();
        // } catch (err) {
        //   console.error(err);
        //   res.status(500).json({ success: false, message: "Error updating profile image" });
        // }
        const newImage = {
            data: req.file.buffer, 
            contentType: req.file.mimetype
        }

        await UserModel.findByIdAndUpdate(req.user.id,{ "profileImg": newImage },)
        .then(docs => {
            console.log("profileImage updated") 
            res.json({
            success: true, 
            message: "profileImage updated" 
            })
        }).catch(err => {
            console.error(err) 
            res.status(500).json({
            success:false, 
            message: "failed to update profileImage", err
            })
        })

      });

    return router 
}

export default protectedRoutes