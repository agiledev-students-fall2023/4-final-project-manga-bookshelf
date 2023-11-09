import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import MangaRow from "../../components/Layout/MangaRow/MangaRow";

import "./profile.css";
const titles = ["Currently Reading", "Done", "Want to Read"];

function Profile() {
  const [profileLists, setProfileLists] = useState([]);

  //get a list of the users profile lists (mock data)
  useEffect(() => {
    async function getProfileLists() {
      const response = await fetch("http://localhost:8080/getProfileLists");
      const data = await response.json();
      setProfileLists([data.result]);
    }
    getProfileLists();
  }, []);

  const groupListsByTitle = (title) => {
    const filteredLists = profileLists.map((profile) => ({
      result: profile.result.filter((item) => item.list === title),
    }));

    return filteredLists;
  };

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
        <div className="profile-image">
          <img
            key={contact.avatar}
            src={contact.avatar || null}
            alt="No Img Detected"
          />
        </div>

        <div className="profile-bio">
          <h1>
            {contact.name ? <>{contact.name}</> : <i>No Name</i>}{" "}
            {/* <Star contact={contact} /> */}
          </h1>

          {contact.twitter && (
            <p className="profile-link">
              <a href={`https://twitter.com/${contact.twitter}`}>
                {contact.twitter}
              </a>
            </p>
          )}

          <div className="follow-section">
            <Form action="follower" className="follower-button">
              <button type="submit">Follower</button>
            </Form>
            <Form action="following" className="following-button">
              <button type="submit">Following</button>
            </Form>
          </div>

          {contact.bio && <p>{contact.bio}</p>}
        </div>

        <div className="edit-section">
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
        {titles.map((t) => (
          <MangaRow title={t} MangaList={groupListsByTitle(t)} />
        ))}
      </section>
    </main>
  );
}
export default Profile;
