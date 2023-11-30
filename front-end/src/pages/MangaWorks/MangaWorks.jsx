import React, { useState, useEffect } from "react"
import MangaRow from "../../components/Layout/MangaRow/MangaRow"

import "./MangaWorks.css"

const genres= ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Josei", "Mystery", "Romance", "Sci-Fi", "Seinen", "Shoujo", "Shounen",  "Slice of Life", "Supernatural"]

function MangaWorks(){
    const [mangaData, setMangaData] = useState({});

    useEffect(()=>{
        async function getMangaByGenre(genre) {
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/recommendation/genre/${genre}`)
                const data = await response.json()
                setMangaData(prevState => ({ ...prevState, [genre]: data }));
            } catch (error){
                console.error("Error fetching data:", error)
            }
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