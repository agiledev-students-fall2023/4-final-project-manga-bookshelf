import React from 'react'
import MangaIcon from '../../Elements/MangaIcon/MangaIcon'
import "./MangaRow.css"

//TODO; connect to MangeList when connecting to API

function MangaRow({title, MangaList}) {
  return (  
    <>
        <h1>{title}</h1>
        <div className="MangaRow-main">
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          <MangaIcon name={"jujutsu"} imgLink={"blah"} />
          {/* {MangaList.map(ele =>{
            <MangaIcon name={"jujutsu"} imgLink={"blah"}/>
          })} */}
        </div>
    </>

  )
}

export default MangaRow