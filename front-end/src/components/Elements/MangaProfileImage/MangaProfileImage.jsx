import { useState } from "react"
import Star from '../Star/Star'

import "./MangaProfileImage.css"
//TODO: import in the correct information for manga pages 

const fav = {favorite: false}

function MangaProfileImage({imgLink}) {

    const [favorite, setFavorite] = useState(false)

    const handleFavorite = () => {
        setFavorite(!favorite); 
        fav.favorite = favorite
}

    return (
        <div className="MangaProfileImage-main">
        <div className="MangaProfileImage-favorite" onClick={handleFavorite}>
            <Star contact={fav}/>
        </div>
        <img src={imgLink} />
        </div>
    )
}

export default MangaProfileImage