import React, { useState } from 'react';

const MangaList = ({ mangas }) => {
  // Group the mangas  by "currently reading", "finished","NULL", and "want to read"
  const mangasByList = mangas.reduce((acc, manga) => {
    if (!acc[manga.list]) {
      acc[manga.list] = [];
    }
    acc[manga.list].push(manga);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(mangasByList).map(([list, listMangas]) => (
        // displaying mangas by list 
        <div key={list}>
          <h2>{list}</h2>    
          {listMangas.map((manga, index) => (
            <div key={index}>
              <h3>Name: {manga.name}</h3>
              <img src={manga.img} alt={manga.name} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MangaList;
