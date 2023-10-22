import React from 'react'
import testimg from "../../../assets/testimg.jpeg"

import "./MangaIcon.css"
//TODO: import in the correct information for manga pages 

function MangaIcon({name, imgLink}) {
  return (
    <div className="MangaIcon-main">
      <img src={testimg}/>
      <span>{name}</span>
    </div>
  )
}

export default MangaIcon