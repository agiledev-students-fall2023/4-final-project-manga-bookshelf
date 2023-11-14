import React, { useEffect, useState } from 'react'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'

import "./home.css"

function Home() {

  const [trending, setTrending] = useState([])
  const [recentlyUpdated, setRecentlyUpdated] = useState([])

  //get a list of recommendation (trending) 
  useEffect(() => {
    async function getListTrendingAndRecentUpdated() {
      const response1 = await fetch("http://localhost:8080/manga/recent/20");
      const data1 = await response1.json()
      setRecentlyUpdated([data1]);

      const response2 = await fetch("http://localhost:8080/manga/recommendation/10");
      const data2 = await response2.json()
      setTrending([data2.result]);
    }
    getListTrendingAndRecentUpdated()

  }, [])

  // TODO: get a list of recently updated: 

  // TODO: get a list of things that the user has added to their profile 

  return (
    <div className="home-main">
      <MangaRow title={"Trending"} MangaList={trending}/>
      <MangaRow title={"Recently Updated"} MangaList={recentlyUpdated} />
      <MangaRow title={"My List"} MangaList={[]} />
    </div>
  )
}

export default Home