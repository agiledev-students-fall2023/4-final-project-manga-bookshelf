import React, {useEffect, useState, useRef} from 'react'
import MangaIcon from '../../Elements/MangaIcon/MangaIcon'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'; 
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';
import { styled } from '@mui/material/styles';

import "./MangaRow.css"

const HoverableIcon_left = styled(ArrowCircleLeftIcon)({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateX(-5px)' // This moves the icon 10 pixels to the right on hover
  }
});

const HoverableIcon_right = styled(ArrowCircleRightIcon)({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateX(5px)' // This moves the icon 10 pixels to the right on hover
  }
});

//TODO; connect to MangeList when connecting to API
//Horizontal scroll menu from https://reactjsexample.com/a-custom-react-hook-for-smooth-horizontal-scrolling/
function MangaRow({title, MangaList}) {

  const { scrollContainerRef, handleScroll, scrollTo} = useSmoothHorizontalScroll();

  return (
    <>
      <h1>{title}</h1>
      <div className="MangaRow-container">
        <HoverableIcon_left className="MangaRow-arrowLeft" fontSize="large" onClick={() => scrollTo(-500)} />
        <div className="MangaRow-main" ref={scrollContainerRef} onScroll={handleScroll}>
          {MangaList.map(ele => (
            <MangaIcon key={ele["node"]["id"]} name={ele["node"]["title"]} imgLink={ele["node"]["main_picture"]["medium"]} />
          ))}
        </div>
        <HoverableIcon_right className="MangaRow-arrowRight" fontSize="large" onClick={() => scrollTo(500)} />
      </div>
    </>
  )
}

export default MangaRow