import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MangaRow from "../../components/Layout/MangaRow/MangaRow";
// import Card from '@mui/material/Card';

import "./profile.css";
const titles = ["Currently Reading", "Done", "Want to Read"];

function Profile() {
  const [profileLists, setProfileLists] = useState([]);
  const [profile, setProfile] = useState({});
  const { profileId } = useParams()

  //get a list of the users profile lists (mock data)
  useEffect(() => {
    async function getProfileLists() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getProfileLists`);
      const data = await response.json();
      console.log(data)
      setProfileLists([data.result]);
    }
    async function getProfile() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/profileInfo`);
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
          </h1>

          {profile.twitter && (
            <p className="profile-link">
              <a href={`https://twitter.com/${profile.twitter}`}>
                {profile.twitter}
              </a>
            </p>
          )}

          <div className="follow-section">
            <Link to={`/profile/${profileId}/follower`} activeClassName="current">
              <button type="submit">Follower</button>
            </Link>
            <Link to={`/profile/${profileId}/following`} activeClassName="current">
              <button type="submit">Following</button>
            </Link>
          </div>

          {profile.bio && <p>{profile.bio}</p>}
        </div>

        <div className="edit-section">
          <Link to={`/profile/${profileId}/edit`} activeClassName="current">
            <button type="submit">Edit Profile</button>
          </Link>
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
