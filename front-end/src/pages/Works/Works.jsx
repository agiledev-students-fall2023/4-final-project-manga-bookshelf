import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
// import sampleMangaDetail from "../../assets/sampleMangaDetail.json"
import MangaInfo from "../../components/Elements/MangaInfo/MangaInfo"

import "./Works.css"


// function Works() { 
//     const [data, setData] = useState([])
//     useEffect(async() => {
  
//             const response = await fetch(`http://localhost:8080/manga/mangasearch/${encodeURIComponent("Kimetsu no Yaiba")}`)
//             const data1= await response.json()
//             setData(data1)
//             console.log(data)
//     },[])

function Works() {
    const [data, setData] = useState([])
    const {mangaId} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/manga/search2/id/${encodeURIComponent(mangaId)}`);
                const data1 = await response.json()
                setData(data1)
                console.log(data1); // Log the updated data, not the state variable
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };
        fetchData();
    }, [mangaId])

    return (
        <div className="Works-main">
            <MangaInfo mangaData={data} />
        </div>
    )
}



export default Works