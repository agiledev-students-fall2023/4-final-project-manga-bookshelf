import express from "express"
import app from "app"

const BASE_ROUTE = "user"

app.get(`/${BASE_ROUTE}`, (req, res) => {
    res.send("get some users!");
})