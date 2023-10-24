import { Form } from "react-router-dom";
import Manga from "../Works/Manga" // for each manga 
import MangaList from "../../components/Elements/MangaList"
import MangaIcon from '../../components/Elements/MangaIcon/MangaIcon'
import MangaRow from '../../components/Layout/MangaRow/MangaRow'
import "./profile"
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
            <div id="contact">
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
                        <Favorite contact={contact} />
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
                    </div>
                </div>
                

                
            </div>
        <section className = "MangaList">
            {titles.map(t => (
            <MangaRow title={t}/>
      ))}
        </section>    
      
        
    </main>
    );
}
export default profile 

function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}