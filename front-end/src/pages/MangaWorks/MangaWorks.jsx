import React, { useState, useEffect } from "react"
import MangaRow from "../../components/Layout/MangaRow/MangaRow"
// import sampleMangaList from "../../assets/sampleMangaList.json"

import "./MangaWorks.css"

const genres= ["Action", "Adventure", "Fantasy", "Horror", "Josei", "Romance", "Seinen", "Shoujo", "Shounen",  "Slice of Life"]

function MangaWorks(){
    // const [action, setAction] = useState([])
    const [mangaData, setMangaData] = useState({});

    useEffect(()=>{
        async function getMangaByGenre(genre) {
            const response = await fetch(`http://localhost:8080/manga/recommendation/genre/${genre}`)
            const data = await response.json()
            setMangaData(prevState => ({ ...prevState, [genre]: data }));
        }
        genres.forEach(genre => getMangaByGenre(genre))
    }, [])
    
    return (
        <div className="home-main">
            {genres.map((genre) => (
                <MangaRow key={genre} title={genre} MangaList={[mangaData[genre]]}/>
            ))}
        </div>
    )
}

export default MangaWorks