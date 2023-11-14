import express from "express"
import app from "app"

const BASE_ROUTE_USER = "user"

app.get(`/${BASE_ROUTE_USER}`, (req, res) => {
    res.send("get some users!");
})