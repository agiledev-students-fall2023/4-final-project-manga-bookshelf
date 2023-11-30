import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import testimg from "../../../assets/testimg.jpeg"
import Star from '../Star/Star'
import Works from "../../../pages/Works/Works"
import { isFavorite } from "../../../helper/helper"

import "./MangaIcon.css"
//TODO: import in the correct information for manga pages 


function MangaIcon({name, imgLink, mangaId, userData}) {

  // This will make styles more consistent
  const [favorite, setFavorite] = useState(false)
  const [favoriteList, setFavoriteList] = useState([])


  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/manga/${mangaId}`)
  }

  const handleFavorite = async () => {
    //define headers 
    const myHeaders = new Headers();
    
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    
    //if current mangaicon is favorited 
    if (favorite){ 
      try { 
        const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/delete/favorite/${mangaId}`, {
          method: "DELETE",
          headers: myHeaders
        })
        const data3 = await response3.json()
        console.log(data3) 
      } catch (error) {
        console.error("Error fetching or accessing db", error)
      }
    }
    else{ // if current mangaicon is not favorited 
      const mangaData = 
      {
        title: name, 
        image: imgLink, 
        __id: mangaId, 
        authorName: "N/A please fix", 
        authorImage: "N/A please fix"
      }
      
      try {
        const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/add/favorite`, {
          method: "POST",
          headers: myHeaders, 
          body: JSON.stringify(mangaData)
        })
        const data3 = await response3.json()
        console.log(data3) 
      } catch (error) {
        console.error("Error fetching or accessing db", error)
      }
    }
    setFavorite(!favorite); 
  }

  //determine if the manga is currently favorite or not 
  useEffect(() => {
    console.log(userData)
    if (isFavorite(userData["favorite"], mangaId)){
      setFavorite(true) 
    }else{
      setFavorite(false)
    }
  }, [])

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