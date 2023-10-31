import React, { useState } from "react"
import MangaProfileImage from "../MangaProfileImage/MangaProfileImage"
import ForumPost from "../ForumPost/ForumPost"

import "./MangaInfo.css"

function MangaInfo({mangaData}) {
    const {title, authors, genres, synopsis} = mangaData
    const genreNames = genres.map((genre) => genre.name).join(', ')
    const authorNames= authors.map((author) => author.node.first_name + ' ' + author.node.last_name).join(', ')

    const [chapter, setChapter] = useState('')

    const handleChapterChange = (e) =>{
        const input = e.target.value
        const validInput= input.replace(/[^0-9\b]/g,"")
        setChapter(validInput)
    }

    return (
        <div className="MangaInfo-main"> 
            <h1> {title} </h1>
            <MangaProfileImage imgLink= {"https://cdn.myanimelist.net/images/manga/1/157897.jpg"}/>
            <div class= "MangaInfo-chapter-tracker">
                <label> Chapter: </label>
                <input
                    type="text"
                    id="chapterInput"
                    value={chapter}
                    placeholder="0"
                    onChange={handleChapterChange}
                />
            </div>
            <h3> Author: </h3>
            <p>  {authorNames} </p>
            <h3> Genres: </h3>
            <p> {genreNames} </p>
            <h3> Synopsis: </h3>
            <p> {synopsis} </p>
            <h3> Comments: </h3>
            <ForumPost username= "Username goes here"/>
        </div>  
    )
}

export default MangaInfo