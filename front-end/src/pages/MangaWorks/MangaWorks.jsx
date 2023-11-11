import React, { useState, useEffect } from "react"
import MangaRow from "../../components/Layout/MangaRow/MangaRow"

import "./MangaWorks.css"

const genres= ["Action", "Adventure", "Fantasy", "Horror", "Josei", "Romance", "Seinen", "Shoujo", "Shounen",  "Slice of Life"]

function MangaWorks(){
    const [action, setAction] = useState([])

    useEffect(()=>{
        async function getMangaByGenre() {
            const response = await fetch("http://localhost:8080/manga/recommendation/genre/Action")
            const data = await response.json()
            console.log(data)
            setAction([data])
        }
        getMangaByGenre()
    }, [])
    
    return (
        <div className="home-main">
            <MangaRow title={"Action"} MangaList={action}/>
            {/* {genres.map(t => (
                <MangaRow title={t} MangaList={sampleMangaList["result"]}/>
            ))} */}
        </div>
    )
}

export default MangaWorks