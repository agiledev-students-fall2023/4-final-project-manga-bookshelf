import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MangaRow from "../../components/Layout/MangaRow/MangaRow";

import "./profile.css";
const titles = ["Currently Reading", "Done", "Want to Read"];

function Profile() {
  const [profileLists, setProfileLists] = useState([]);
  const [profile, setProfile] = useState({});
  const { profileId } = useParams()

  //get a list of the users profile lists (mock data)
  useEffect(() => {
    async function getProfileLists() {
      const response = await fetch("http://localhost:8080/getProfileLists");
      const data = await response.json();
      console.log(data)
      setProfileLists([data.result]);
    }
    async function getProfile() {
      const response = await fetch(`http://localhost:8080/user/${profileId}/profileInfo`);
      const data = await response.json();
      // console.log(data.result)
      setProfile(data);
    }
    getProfileLists();
    getProfile();
  }, [profileId]);

  const groupListsByTitle = (title) => {
    const filteredLists = profileLists.map((profile) => ({
      result: profile.result.filter((item) => item.list === title),
    }));

    return filteredLists;
  };

  return (
    <main className="profile-main">
      <div className="profile-contact">
        <div className="profile-image">
          <img
            key={profile.avatar}
            src={profile.avatar || null}
            alt="No Img Detected"
          />
        </div>

        <div className="profile-bio">
          <h1>
            {profile.name ? <>{profile.name}</> : <i>No Name</i>}{" "}
            {/* <Star contact={contact} /> */}
          </h1>

          {profile.twitter && (
            <p className="profile-link">
              <a href={`https://twitter.com/${profile.twitter}`}>
                {profile.twitter}
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

          {profile.bio && <p>{profile.bio}</p>}
        </div>

        <div className="edit-section">
          <Form action="edit">
            <button type="submit">Edit Profile</button>
          </Form>
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
