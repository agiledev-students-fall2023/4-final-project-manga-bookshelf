import React from "react"
import sampleMangaDetail from "../../assets/sampleMangaDetail.json"
import MangaInfo from "../../components/Elements/MangaInfo/MangaInfo"

import "./Manga.css"


function Manga() { 
    return (
        <div>
            <MangaInfo mangaData={sampleMangaDetail} />
        </div>
    )
}

export default Manga