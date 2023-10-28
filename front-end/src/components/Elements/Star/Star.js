import React from 'react'

import "./Star.css"

function Star({ contact }) {
  // yes, this is a `let` for later
  const favorite = contact.favorite;
  return (
      <button
        className="Star-button"
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
  );
}

export default Star