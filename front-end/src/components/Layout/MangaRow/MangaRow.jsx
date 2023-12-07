import React, { useEffect, useState } from "react";
import MangaIcon from "../../Elements/MangaIcon/MangaIcon";
import MangaListEmpty from "../MangaListEmpty/MangaListEmpty";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";
import Loading from "../../Elements/Loading/Loading";
import { styled } from "@mui/material/styles";

import "./MangaRow.css";

//Horizontal scroll menu from https://reactjsexample.com/a-custom-react-hook-for-smooth-horizontal-scrolling/
const HoverableIconLeft = styled(ArrowCircleLeftIcon)({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateX(-5px)", // This moves the icon 10 pixels to the right on hover
  },
});

const HoverableIconRight = styled(ArrowCircleRightIcon)({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateX(5px)", // This moves the icon 10 pixels to the right on hover
  },
});

function MangaRow({ title, icon, MangaList }) {
  const { scrollContainerRef, handleScroll, scrollTo } =
    useSmoothHorizontalScroll();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // filter out duplicate manga
  const uniqueMangaList = [];
  const seenIds = new Set();
  if (MangaList[0] && MangaList[0]["result"].length !== 0) {
    MangaList[0]["result"].forEach((ele) => {
      if (!seenIds.has(ele["__id"])) {
        seenIds.add(ele["__id"]);
        uniqueMangaList.push(ele);
      }
    });
  }

  //retrieve all the mangaList items from user and pass into MangaIcon
  useEffect(() => {
    async function getData() {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("jwtToken")}`
      );

      const response3 = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );
      const data3 = await response3.json();
      setUser(data3.user);
      setIsLoading(false);
    }
    getData();
  }, []);
  

  
  if (isLoading) {
    return (
      <>
        <div className="MangaRow-container">
          <h1 className="MangaRow-fadeDownTitle">{title}</h1>
          <div
            className="MangaRow-main"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {Array(10).fill().map((_, index) => (
              <Loading key={index} title={title} />
            ))}
          </div>
        </div>
      </>
    ); // Or any other loading indicator
  }

  return (
    <>
      <div className="MangaRow-container">
        <h1 className="MangaRow-fadeDownTitle">{title}</h1>
          <div className="MangaRow-fadeDownContent">
            {MangaList[0] && MangaList[0]["result"].length !== 0 ? (
              <>
                <HoverableIconLeft
                  className="MangaRow-arrowLeft"
                  fontSize="large"
                  onClick={() => scrollTo(-500)}
                />
                <div
                  className="MangaRow-main"
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                >
                  {uniqueMangaList.map((ele) => (
                    <MangaIcon
                      key={ele["__id"]}
                      name={ele["title"]}
                      imgLink={ele["image"]}
                      mangaId={ele["__id"]}
                      userData={user}
                    />
                  ))}
                </div>
                <HoverableIconRight
                  className="MangaRow-arrowRight"
                  fontSize="large"
                  onClick={() => scrollTo(500)}
                />
              </>
            ) : (
              <MangaListEmpty />
            )}
            </div>
      </div>
    </>
  );
      
}

export default MangaRow;