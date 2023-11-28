import { useState } from "react"
import Star from '../Star/Star'

import "./MangaProfileImage.css"
//TODO: import in the correct information for manga pages 


function MangaProfileImage({imgLink}) {

    const [favorite, setFavorite] = useState(false)

    //TODO: Make database call
    const handleFavorite = () => {
        setFavorite(!favorite); 
    }

    return (
        <div className="MangaProfileImage-main">
            <div className="MangaProfileImage-favorite" onClick={handleFavorite}>
                <Star favorite={favorite}/>
            </div>
            <img src={imgLink} />
        </div>
    )
}

export default MangaProfileImage