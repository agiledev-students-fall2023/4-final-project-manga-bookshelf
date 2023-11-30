import React, { useEffect } from 'react'

import "./Star.css"

function Star({ favorite }) {
  // yes, this is a `let` for later
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