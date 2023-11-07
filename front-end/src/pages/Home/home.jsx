import React, { useEffect, useState } from 'react'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'

import "./home.css"

function Home() {

  const [trending, setTrending] = useState([])

  //get a list of recommendation (trending) 
  useEffect(() => {
    async function getListRecommendation() {
      const response = await fetch("http://localhost:8080/manga/recommendation/10");
      const data = await response.json()
      console.log(data)
      setTrending([data.result]);
    }
    getListRecommendation()
  }, [])

  // TODO: get a list of recently updated: 

  // TODO: get a list of things that the user has added to their profile 

  return (
    <div className="home-main">
      <MangaRow title={"Trending"} MangaList={trending}/>
      <MangaRow title={"Recently Updated"} MangaList={[]} />
      <MangaRow title={"My List"} MangaList={[]} />
    </div>
  )
}

export default Home