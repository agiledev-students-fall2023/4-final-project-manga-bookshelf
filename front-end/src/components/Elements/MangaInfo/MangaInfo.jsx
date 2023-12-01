import React, { useState } from "react"
import MangaProfileImage from "../MangaProfileImage/MangaProfileImage"
import ForumPost from "../ForumPost/ForumPost"

import "./MangaInfo.css"

function MangaInfo({mangaData}) {
    const {title, author, genres, synopsis, image} = mangaData[0] || {}
    // console.log(mangaData[0])
    const genresArray = genres ? Object.values(genres).map(genre => genre.name) : []
    const authorNames= author ? author.split(',').reverse().join(' '): ''
    const mangaImage= image && image.jpg && image.jpg.default

    const [chapter, setChapter] = useState('')
    const [isMenuOpen, setMenuOpen] =useState(false)

    const handleAddClick = () => {
        setMenuOpen(!isMenuOpen)
    }

    const handleAddListClick = (item) => {
        console.log(`clicked on ${item}`)
        setMenuOpen(false)
    }

    const handleChapterChange = (e) =>{
        const input = e.target.value
        const validInput= input.replace(/[^0-9\b]/g,"")
        setChapter(validInput)
    }

    return (
        <div className= "MangaInfo-container">
            <h1> {title} </h1>
            <div className= "MangaInfo-main">
                <div className="MangaInfo-left">
                    {mangaImage && <MangaProfileImage imgLink= {mangaImage}/>}
                    <div className= "MangaInfo-add">
                        <button onClick={handleAddClick}>+ Add to List</button>
                            {isMenuOpen && (
                                <ul className="menu">
                                    <button onClick={() => handleAddListClick('Reading')}>Reading</button>
                                    <button onClick={() => handleAddListClick('Want to Read')}>Want to Read</button>
                                    <button onClick={() => handleAddListClick('Already Read')}>Already Read</button>
                                </ul>
                            )}
                    </div>
                </div>
                <div className= "MangaInfo-right">
                    <div className= "MangaInfo-content">
                        <div className= "MangaInfo-chapter-tracker">
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
                        <p> {genresArray.join (', ')} </p>
                        <h3> Synopsis: </h3>
                        <p> {synopsis} </p>
                    </div>
                </div>
            </div>
            <div className="MangaInfo-comments">
                <h3> Comments: </h3>
                <ForumPost username= "Username goes here"/>  
            </div>
        </div>
    )
}

export default MangaInfo