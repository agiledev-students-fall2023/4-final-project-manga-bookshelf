import React, { useState } from 'react'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'

import "./home.css"

const titles = ["Trending", "Recently Updated", "My List"]

function home() {

  return (
    <div className="home-main">
      {titles.map(t => (
        <MangaRow title={t}/>
      ))}
    </div>
  )
}

export default home