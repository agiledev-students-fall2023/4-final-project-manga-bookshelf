import express from 'express' 
import * as Jikan from "../helpers/Jikan.js" //import helper function that we want to use

const mangaRouter=express.Router()

//send result back with result json 
mangaRouter.get(`/search/:entry`, async (req, res) => {
    const payload = await Jikan.getMangaSearch(req.params.entry)
    res.json({result: payload})
})

//send result back with array
mangaRouter.get(`/search2/:entry`, async (req, res) => {
    const payload = await Jikan.getMangaSearch(req.params.entry)
    res.json(payload)
})

mangaRouter.get(`/search/id/:id`, async (req, res) => {
    const payload = await Jikan.getMangaInfoById(req.params.id);
    res.json({result: payload})
})

mangaRouter.get(`/search2/id/:id`, async (req, res) => {
    const payload = await Jikan.getMangaInfoById(req.params.id);
    res.json(payload)
})

mangaRouter.get(`/mangasearch/:entry`, async (req, res) => {
    //get the top manga's id
    const mangaId = await Jikan.getTopMangaId(req.params.entry) 
    //get that manga's info using the id
    const payload2 = await Jikan.getMangaInfoById(mangaId) 
    res.json(payload2)
})

// Need to set up route which gives a recommendation based on a specific entry (like action, romance, etc)
mangaRouter.get(`/recommendation/:num`, async (req, res) => {
    const payload = await Jikan.getMangaRecommendations(req.params.num)
    res.json({result: payload})  
})

mangaRouter.get(`/recommendation/genre/:genreName`, async (req, res) => {
    const genres = await Jikan.getMangaInfoByGenres(req.params.genreName);
    res.json({ result: genres });
})

mangaRouter.get(`/recent/:num`, async (req, res) => {
    const payload = await Jikan.getRecentMangas(req.params.num)
    res.json({result: payload})
})

mangaRouter.get(`/upcoming/:num`, async (req, res) => {
    const payload = await Jikan.getUpcomingMangas(req.params.num)
    res.json({result: payload})
})

export default mangaRouter;
