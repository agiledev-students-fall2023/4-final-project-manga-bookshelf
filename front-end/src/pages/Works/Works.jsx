import React from "react"
import sampleMangaDetail from "../../assets/sampleMangaDetail.json"
import MangaInfo from "../../components/Elements/MangaInfo/MangaInfo"

import "./Works.css"


function Works() { 
    return (
        <div className="Works-main">
            <MangaInfo mangaData={sampleMangaDetail} />
        </div>
    )
}

export default Works