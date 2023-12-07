import React from 'react'
import './MangaListEmpty.css'

function MangaListEmpty() {
  return (
    <>
      <div className="MangaListEmpty-container">
        <div className="MangaListEmpty-main">
          <MangaIconEmpty />
          <MangaIconEmpty />
          <MangaIconEmpty />
          <MangaIconEmpty />
        </div>
      </div>
    </>
  )
}

function MangaIconEmpty() {
  return (
    <div className="MangaListEmpty-icon">
      <img />
    </div>
  );
}


export default MangaListEmpty