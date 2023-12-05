import { useEffect, useState } from "react"
import Star from '../Star/Star'
import { isFavorite } from "../../../helper/helper"

import "./MangaProfileImage.css"
//TODO: import in the correct information for manga pages 

function MangaProfileImage({name, imgLink, mangaId, userData}) {

    const [favorite, setFavorite] = useState(false)

    const handleFavorite = async () => {
            //define headers 
        const myHeaders = new Headers();
        
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
        
        //if current mangaicon is favorited 
        if (favorite){ 
            try { 
                const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/delete/favorite/${mangaId}`, {
                method: "DELETE",
                headers: myHeaders
                })
                await response3.json()
            } catch (error) {
                console.error("Error fetching or accessing db", error)
            }
        }
        else{ // if current mangaicon is not favorited 
            const mangaData = 
            {
                title: name, 
                image: imgLink, 
                __id: mangaId, 
                authorName: "N/A please fix", 
                authorImage: "N/A please fix"
            }
            
            try {
                const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/add/favorite`, {
                    method: "POST",
                    headers: myHeaders, 
                    body: JSON.stringify(mangaData)
                })
                const data3 = await response3.json()
            } catch (error) {
                console.error("Error fetching or accessing db", error)
            }
        }
        setFavorite(!favorite); 
    }

    useEffect(() => {
        if (isFavorite(userData["favorite"], mangaId)){
            setFavorite(true) 
        } else{
            setFavorite(false)
        }
    }, [])
    
    return (
        <div className="MangaProfileImage-main">
            <div className="MangaProfileImage-favorite" onClick={handleFavorite}>
                <Star favorite={favorite}/>
            </div>
            <img src={imgLink} />
        </div>
    )
}

export default MangaProfileImage