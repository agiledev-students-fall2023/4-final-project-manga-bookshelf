import { Form, useNavigate } from "react-router-dom"
import Works from "../Works/Works" // for each manga 
import { useState, useEffect } from "react"
import MangaList from "../../components/Elements/MangaList"
import MangaIcon from '../../components/Elements/MangaIcon/MangaIcon'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'
import Star from "../../components/Elements/Star/Star";

import "./profile.css"
const titles = ["Currently Reading", "Done", "Want to Read"]

function Profile() {
    const [profileLists, setProfileLists] = useState([])

  //get a list of the users profile lists (mock data)
  useEffect(() => {
    async function getProfileLists() {
      const response = await fetch("http://localhost:8080/getProfileLists");
      const data = await response.json()
      console.log(data)
      setProfileLists([data.result]);
    }
    getProfileLists()
  }, [])

  function sortListsByTitle(title) {

  }

    const contact = {
        name: "Naruto Uzumaki",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        bio: "I love ramen! ",
        favorite: true,
    };

    return (
        <main className="profile-main">
            <div className="profile-contact">
                <div className='profile-image'>
                    <img
                        key={contact.avatar}
                        src={contact.avatar || null}
                        alt="No Img Detected"
                    />
                </div>

                <div className='profile-bio'>
                    <h1>
                        {contact.name ? (
                            <>
                                {contact.name}
                            </>
                        ) : (
                            <i>No Name</i>
                        )}{" "}
                        {/* <Star contact={contact} /> */}
                    </h1>
                    
                    {contact.twitter && (
                        <p className='profile-link'>
                            <a href={`https://twitter.com/${contact.twitter}`}>
                                {contact.twitter}
                            </a>
                        </p>
                    )}

                    <div className='follow-section'>
                        <Form action="follower" className='follower-button'>
                            <button type="submit">Follower</button>
                        </Form>
                        <Form action="following" className="following-button">
                            <button type="submit">Following</button>
                        </Form>
                    </div>

                    {contact.bio && <p>{contact.bio}</p>}
                </div>  

                <div className = "edit-section">
                    <Form action="edit">
                        <button type="submit">Edit Profile</button>
                    </Form>
                    {/* <Form
                        method="post"
                        action="destroy"
                    >
                        <button type="submit">Delete</button>
                    </Form> */}
                </div>
            </div>

            <section className="myList">                
            {titles.map(t => (
    <MangaRow title={t} MangaList={profileLists} />
))}
            </section>

    </main>
    );
}
export default Profile 

