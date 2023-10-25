import { Form } from "react-router-dom";
import Manga from "../Works/Manga" // for each manga 
import MangaList from "../../components/Elements/MangaList"
import MangaIcon from '../../components/Elements/MangaIcon/MangaIcon'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'
import Star from "../../components/Elements/Star/Star";

import "./profile.css"
const titles = ["Currently Reading", "Done", "Want to Read"]

function profile() {
    const contact = {
        name: "Naruto Uzumaki",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        bio: "I love ramen! ",
        favorite: true,
    };

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
        <main className="Profile">
            <div className="profile-contact">
                <div>
                    <img
                        key={contact.avatar}
                        src={contact.avatar || null}
                        alt="No Img Detected"
                    />
                </div>

                <div>
                    <h1>
                        {contact.name ? (
                            <>
                                {contact.name}
                            </>
                        ) : (
                            <i>No Name</i>
                        )}{" "}
                        <Star contact={contact} />
                    </h1>

                    {contact.twitter && (
                        <p>
                            <a
                                href={`https://twitter.com/${contact.twitter}`}
                            >
                                {contact.twitter}
                            </a>
                        </p>
                    )}

                    {contact.bio && <p>{contact.bio}</p>}


                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                    >
                        <button type="submit">Delete</button>
                    </Form>
                    <Form action="follower">
                        <button type="submit">Follower</button>
                    </Form>
                    <Form action="following">
                        <button type="submit">Following</button>
                    </Form>
                </div>
                

                
            </div>
        {/* <section className = "MangaList">
            {titles.map(t => (
            <MangaRow title={t}/>
      ))}
        </section>     */}
      
      </div>  
    </main>
    );
}
export default profile 

