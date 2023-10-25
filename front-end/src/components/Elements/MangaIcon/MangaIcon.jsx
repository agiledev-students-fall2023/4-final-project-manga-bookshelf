import { useState } from "react"
import testimg from "../../../assets/testimg.jpeg"
import Star from '../Star/Star'

import "./MangaIcon.css"
//TODO: import in the correct information for manga pages 

const fav = {favorite: false}

function MangaIcon({name, imgLink}) {

  const [favorite, setFavorite] = useState(false)

  const handleOnClick = () => {

  }

  const handleFavorite = () => {
    setFavorite(!favorite); 
    fav.favorite = favorite
  }

  return (
    <div className="MangaIcon-main">
      <div className="MangaIcon-favorite" onClick={handleFavorite}>
        <Star contact={fav}/>
      </div>
      <img src={testimg} onClick={handleOnClick}/>
      <span>{name}</span>
    </div>
  )
}

export default MangaIcon