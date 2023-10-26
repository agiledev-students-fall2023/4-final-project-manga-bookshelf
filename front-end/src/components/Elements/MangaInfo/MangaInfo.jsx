import React from "react"
import MangaProfileImage from "../MangaProfileImage/MangaProfileImage"

import "./MangaInfo.css"

function MangaInfo({mangaData}) {
    const {title, authors, genres, synopsis} = mangaData
    const genreNames = genres.map((genre) => genre.name).join(', ')
    const authorNames= authors.map((author) => author.node.first_name + ' ' + author.node.last_name).join(', ')


    return (
        <div> 
            <h1> {title} </h1>
            <MangaProfileImage imgLink= {"https://cdn.myanimelist.net/images/manga/1/157897.jpg"}/>
            <p> Genres: {genreNames} </p>
            <p> Author: {authorNames} </p>
            <p> Synopsis: {synopsis} </p>
        </div>  
    )
}

export default MangaInfo