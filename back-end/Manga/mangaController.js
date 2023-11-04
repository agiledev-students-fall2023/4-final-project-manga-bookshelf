import express from "express"
import app from "app"

const BASE_ROUTE_MANGA = "manga"

app.get(`/${BASE_ROUTE_MANGA}/`, (req, res) => {
    res.send("get some mangas!");
})

