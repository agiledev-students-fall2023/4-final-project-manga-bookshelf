import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MangaRow from "../../components/Layout/MangaRow/MangaRow";
// import Card from '@mui/material/Card';

import "./profile.css";
const titles = ["Currently Reading", "Done", "Want to Read"];

function Profile() {
  const [profileLists, setProfileLists] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const { profileId } = useParams()

  const [currentProfileInfo, setCurrentProfileInfo] = useState([])

  //get a list of the users profile lists (mock data)
  useEffect(() => {
    async function getProfileLists() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getProfileLists`);
      const data = await response.json();
      setProfileLists([data.result]);

    async function getProfileInfo() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${profileId}/profileInfo`);

      const data = await response.json();
      console.log(profileId)
      setProfileInfo(data);
    }
    getProfileLists();
    getProfileInfo();
  }, [profileId]);

  useEffect(() => {
    async function getCurrentUser(){
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);

      const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`, {
        method: "GET",
        headers: myHeaders
      })
      const data3 = await response3.json()
      setCurrentProfileInfo(data3["user"]) 
    }
    getCurrentUser()
  }, [])

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
            src={profileInfo.profileImg}
            alt="No Img Detected"
          />
        </div>

        <div className="profile-bio">
          <h1>
            Welcome, {currentProfileInfo.username ? <>{currentProfileInfo.username}</> : <i>No Name</i>}{" "}
          </h1>

          <div className="follow-section">
            <Link to={`/profile/${profileId}/follower`} activeclassname="current">
              <button type="submit">Follower</button>
            </Link>
            <Link to={`/profile/${profileId}/following`} activenlassname="current">
              <button type="submit">Following</button>
            </Link>
          </div>

          {currentProfileInfo.bio && <p>{currentProfileInfo.bio}</p>}
        </div>

        <div className="edit-section">
          <Link to={`/profile/${profileId}/edit`} activeclassname="current">
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
