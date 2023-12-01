import React, { useEffect, useState } from 'react'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'

import "./home.css"


function Home() {

  const [trending, setTrending] = useState([])
  const [recentlyUpdated, setRecentlyUpdated] = useState([])
  const [myList, setMyList] = useState([]) 

  useEffect(() => {
    async function getListTrendingAndRecentUpdated() {
      
      //first row
      const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/recent/20`);
      const data1 = await response1.json()
      setRecentlyUpdated([data1]);
      
      //second row
      const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/recommendation/10`);
      const data2 = await response2.json()
      setTrending([data2.result]);

      //remember to set headers before sending to authorized route
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

      const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`, {
        method: "GET", 
        headers: myHeaders
      })
      const data3 = await response3.json()
      setMyList([{"result": data3.user.favorite}])
    }
    getListTrendingAndRecentUpdated()

  }, [])

  // TODO: get a list of things that the user has added to their profile 

  return (
    <div className="home-main">
      <MangaRow title={"Trending"} MangaList={trending}/>
      <MangaRow title={"Recently Updated"} MangaList={recentlyUpdated} />
      <MangaRow title={"My Favorite"} MangaList={myList} />
    </div>
  )
}

export default Home