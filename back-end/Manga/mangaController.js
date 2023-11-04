import app from "../app.mjs"

const BASE_ROUTE_MANGA = "manga"

app.get(`/`, (req, res) => {
    res.send("get some mangas!");
})


