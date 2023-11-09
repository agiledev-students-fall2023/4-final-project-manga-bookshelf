import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import testimg from "../../../assets/testimg.jpeg"
import Star from '../Star/Star'
import Works from "../../../pages/Works/Works"

import "./MangaIcon.css"
//TODO: import in the correct information for manga pages 


function MangaIcon({name, imgLink}) {

  // This will make styles more consistent
  const [favorite, setFavorite] = useState(false)

  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate("/manga/:mangaId")
    
  }

  const handleFavorite = () => {
    setFavorite(!favorite); 
    console.log(favorite) 
  }

  return (
    <div className="MangaIcon-main">
      <div className="MangaIcon-favorite" onClick={handleFavorite}>
        <Star favorite={favorite}/>
      </div>
      <img src={imgLink} onClick={handleOnClick}/>
      <span>{name}</span>
    </div>
  )
}

export default MangaIcon