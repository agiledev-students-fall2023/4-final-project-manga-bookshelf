import React, { useEffect } from "react"
import MangaRow from "../../components/Layout/MangaRow/MangaRow"
import sampleMangaList from "../../assets/sampleMangaList.json"

import "./MangaWorks.css"

const genres= ["Action", "Adventure", "Fantasy", "Horror", "Josei", "Romance", "Seinen", "Shoujo", "Shounen",  "Slice of Life"]

function MangaWorks(){
    useEffect(()=>{
        console.log(sampleMangaList.data)
    }, [])
    
    return (
        <div className="home-main">
            {genres.map(t => (
                <MangaRow title={t} MangaList={sampleMangaList["result"]}/>
            ))}
        </div>
    )
}

export default MangaWorks