import React, { useEffect, useState } from 'react'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'

import "./home.css"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Home() {

  const [trending, setTrending] = useState([])
  const [recentlyUpdated, setRecentlyUpdated] = useState([])
  const [myList, setMyList] = useState([]) 
  const [favoriteAction, setFavoriteAction] = useState(false);

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
    console.log(favoriteAction)
    if (favoriteAction) {
      getListTrendingAndRecentUpdated()
      setFavoriteAction(false)
    }
    getListTrendingAndRecentUpdated()

  }, [favoriteAction])

  return (
    <div className="home-main">
      <MangaRow title={"Trending"} MangaList={trending} icon={TrendingUpIcon} setFavoriteAction={setFavoriteAction}/>
      <MangaRow title={"Recently Updated"} MangaList={recentlyUpdated} setFavoriteAction={setFavoriteAction}/>
      <MangaRow title={"My Favorite"} MangaList={myList} setFavoriteAction={setFavoriteAction}/>
    </div>
  )
}

export default Home