import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Home.css"
import Manga from "./Manga" // for each manga 
import MangaList from "./MangaList"


const userProfile = () => {
  const [feedback, setFeedback] = useState("")

  // a function that will be run anytime a user clicks on a puppy article
  // see the code in Puppy.js for how this function is passed the name, breed, and sound of the clicked-on puppy
  const handleClick = (name, breed) => {
    setFeedback(`You clicked on ${name} the ${breed}! ${sound}!`)
    console.log(`You clicked on ${name} the ${breed}! ${sound}!`)
  }

  // user info(fetched from a back-end )
  const userInfo = 
    {
      name: "Naruto Uzumaki",
      bio: "I love ramen! ",
      img: `${process.env.PUBLIC_URL}/Naruto.jpg`, //in the 'public' directory
    }
    // an array of manga data(should fetched from a back-end server API) 
 
  const mangas = [
    {
      name: "SpyxFamily",
      list: "Currently Reading",
      img: `${process.env.PUBLIC_URL}/spyfamily.jpg`, 
      
    },
    {
      name: "Jujutsu Kaisen",
      list: "Currently Reading",
      img: `${process.env.PUBLIC_URL}/JujutsuKaisen.jpg`, 
    },
    {
      name: "One Piece",
      list: "Want to Read",
      img: `${process.env.PUBLIC_URL}/onepiece.jpg`,
    },
    {
      name: "Naruto",
      list: "Done",
      img: `${process.env.PUBLIC_URL}/naurto2.jpg`, 
    },
  ]
  

  return (
    <main className="userProfile">
      <h1>Hello to the app</h1>
      <p>
        Lorem <Link to="/about">about us</Link> ipsum dolor sit amet foo bar baz
        bum
      </p>
      {feedback && (
        <div>
          <p class="Home-feedback">{feedback}</p>
        </div>
      )}
      <section className="library">
        <div>
            {/* Pass the mangalist data as a prop to the PuppyList component */}
            <MangaList manags={mangas} />
            
           
         </div>
      </section>
    </main>
  )
}

export default userProfile