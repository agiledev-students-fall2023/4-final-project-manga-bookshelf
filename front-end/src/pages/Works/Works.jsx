import React from "react"
import { useEffect } from "react"
import { useState } from "react"
// import sampleMangaDetail from "../../assets/sampleMangaDetail.json"
import MangaInfo from "../../components/Elements/MangaInfo/MangaInfo"

import "./Works.css"


function Works() { 
    const [data, setData] = useState([])
    useEffect(() => {
        async function getMangaInfo(searchquery) {
            const response = await fetch(`http://localhost:8080/manga/mangasearch/${encodeURIComponent(searchquery)}`)
            const data1= await response.json()
            setData(data1)
        }
    },[])

    return (
        <div className="Works-main">
            <MangaInfo mangaData={data} />
        </div>
    )
}

export default Works