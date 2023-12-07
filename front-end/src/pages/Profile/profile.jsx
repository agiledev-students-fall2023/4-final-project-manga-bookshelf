import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MangaRow from "../../components/Layout/MangaRow/MangaRow";
import loadingImg from "../../assets/loading.png";
import { imagefrombuffer } from "imagefrombuffer"; //first import 

import "./profile.css";
import {Buffer} from "buffer"; 


function Profile() {
  const [profileInfo, setProfileInfo] = useState({});
  const { profileId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user")).username;
  const isCurrentUser = currentUser === profileId;
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [userData, setUserData] = useState({});

  const [reading, setReading] = useState([])
  const [done, setDone] = useState([])
  const [want, setWant] = useState([])
  const [myList, setMyList] = useState([]) 

  const handleFollowClick = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const actionUrl = isFollowed
      ? `${process.env.REACT_APP_BACKEND_URL}/user/${currentUser}/unfollow`
      : `${process.env.REACT_APP_BACKEND_URL}/user/${currentUser}/follow`;

    const payload = isFollowed
      ? { unfollowingName: profileInfo.username }
      : { followingName: profileInfo.username };

    axios
      .post(actionUrl, payload)
      .then((response) => {
        setIsFollowed(!isFollowed);
      })
      .catch((err) => {
        console.error(
          `Error in ${isFollowed ? "unfollow" : "follow"} request: `,
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {

    async function getUserInfo() {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("jwtToken")}`
      );

    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/protected/user/get/anotheruser/${profileId}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      const data = await response.json();
      if (!response.ok || data == null) {
        setUserExists(false);
        return;
      }
      setProfileInfo(data);
      setUserData(data.profileImg)
      setMyList([{"result": data.favorite}])
      setReading([{"result": data.currentlyReading}])
      setWant([{"result": data.wantReading}])
      setDone([{"result": data.finishReading}])
      if (!isCurrentUser) {
        setIsFollowed(
          data.follower.includes(
            JSON.parse(localStorage.getItem("user")).username
          )
        );
      }
    }
    getUserInfo();
    // getProfileLists();
  }, [profileId, isCurrentUser]);

  useEffect(() => {
    async function getUserInfo() {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("jwtToken")}`
      );

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`,{
        method: "GET", 
        headers: myHeaders,
      })

      const data = await response.json() 
      
      const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`, {
        method: "GET", 
        headers: myHeaders
      })
    }
    getUserInfo() 
  }, [])

  return (
    <main className="profile-main">
      <div className="profile-contact">
        <div className="profile-image">
        {userData.contentType ? (
          <img
          src={`data:${userData.contentType};base64,${Buffer.from(userData.data.data).toString('base64')}`}
          alt="Profile"
        />) 
        : (
          <img src={loadingImg} alt={profileInfo.username} />
        )}
        </div>
            
        <div className="profile-bio">
          <h1>
            Welcome,{profileInfo.username ? <>{profileInfo.username}</> : <i>No Name</i>}{" "}
          </h1>

          <div className="follow-section">
            <Link to={`/profile/${profileId}/follower`} activeclassname="current">
              <button type="submit">Follower</button>
            </Link>
            <Link to={`/profile/${profileId}/following`} activenlassname="current">
              <button type="submit">Following</button>
            </Link>
          </div>
            {profileInfo.bio && <p> {profileInfo.bio}</p>}
        </div>

        <div className="edit-section">
          { !isCurrentUser && (
              <button 
                className={`follow-button ${isFollowed ? 'followed' : 'not-followed'}`}
                onClick={handleFollowClick}
              >
                { isFollowed ? 'Unfollow' : 'Follow +' }
              </button>
          )}
          { isCurrentUser && (
              <Link to={`/profile/${profileId}/edit`} activeclassname="current">
                <button type="submit">Edit Profile</button>
              </Link>
            )
          }

        </div>
      </div>

      <section className="myList">
        <MangaRow title={"My Favorite"} MangaList={myList} />
        <MangaRow title={"Currently Reading"} MangaList={reading} />
        <MangaRow title={"Want to Read"} MangaList={want} />
        <MangaRow title={"Finished Reading"} MangaList={done} />
      </section>
    </main>
  );
}
export default Profile;