import React, {useEffect} from 'react'
import MangaIcon from '../../Elements/MangaIcon/MangaIcon'
import "./MangaRow.css"

//TODO; connect to MangeList when connecting to API

function MangaRow({title, MangaList}) {

  return (  
    <>
        <h1>{title}</h1>
        <div className="MangaRow-main">
          {MangaList.map(ele => (
            <MangaIcon name={ele["node"]["title"]} imgLink={ele["node"]["main_picture"]["medium"]}/>
          ))}
        </div>
    </>

  )
}

export default MangaRow