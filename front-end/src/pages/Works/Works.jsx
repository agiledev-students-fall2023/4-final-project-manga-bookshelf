import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import MangaInfo from "../../components/Elements/MangaInfo/MangaInfo"

import "./Works.css"

function Works() {
    const [data, setData] = useState([])
    const {mangaId} = useParams()
    const [user, setUser] = useState({})
    const [reading, setReading] = useState([])
    const [done, setDone] = useState([])
    const [want, setWant] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [mangaExists, setMangaExists] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/search2/id/${encodeURIComponent(mangaId)}`)
            if (!response.ok) {
                setMangaExists(false)
                return
            }
            const data1 = await response.json()
            setData([data1])
            
            const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
        
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`, {
                method: "GET",
                headers: myHeaders
            })
            const data3 = await response3.json()
            setUser(data3.user)

            setIsLoading(false); // Set loading to false after fetching data

        }

        fetchData()
        
    }, [])

    if (!mangaExists) {
        return <div>Manga does not exist</div>
    }

    if (isLoading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <div className="Works-main">
            <MangaInfo mangaData={data} userData={user}/>
        </div>
    )
}



export default Works