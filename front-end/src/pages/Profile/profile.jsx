import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MangaRow from "../../components/Layout/MangaRow/MangaRow";
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react';
// import Card from '@mui/material/Card';

import "./profile.css";
const titles = ["Currently Reading", "Done", "Want to Read"];

function Profile() {
  const [profileLists, setProfileLists] = useState([]);
  const [profile, setProfile] = useState({});
  const { profileId } = useParams()

  async function handleSubmit(e){
    //may need to make this function accessible to all files
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
    const result = await auth.signin(data.get('username'), data.get('password'))
    console.log(result) 
    console.log(JSON.parse(localStorage.getItem('user')))
};

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
