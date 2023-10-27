import React, { useEffect, useState } from 'react'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'
import sampleMangaList from "../../assets/sampleMangaList.json"

import "./home.css"

const titles = ["Trending", "Recently Updated", "My List"]

function Home() {

  useEffect(()=>{
    console.log(sampleMangaList)
  }, [])

  return (
    <div className="home-main">
      {titles.map(t => (
        <MangaRow title={t} MangaList={sampleMangaList["data"]}/>
      ))}
    </div>
  )
}

export default Home