import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import MangaInfo from "../../components/Elements/MangaInfo/MangaInfo"

import "./Works.css"

function Works() {
    const [data, setData] = useState([])
    const {mangaId} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/search2/id/${encodeURIComponent(mangaId)}`);
                const data1 = await response.json()
                setData([data1])
                
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()

        return () => {
            console.log(data)
        }
    }, [mangaId])

    return (
        <div className="Works-main">
            <MangaInfo mangaData={data}/>
        </div>
    )
}



export default Works