import React from "react";

function ListItem({ movie, watchedMovie, onClick }) {
  const imdbID = movie?.imdbID || watchedMovie?.imdbID;
  const poster = movie?.Poster || watchedMovie?.poster;
  const title = movie?.Title || watchedMovie?.title;

  return (
    <>
      <li key={imdbID} onClick={onClick}>
        <img src={poster} alt={`${title} poster`} />
        <h3>{title}</h3>
        {movie && (
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        )}
        {watchedMovie && (
          <div>
            <p>
              <span>⭐️</span>
              <span>{watchedMovie.userRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{watchedMovie.rating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{watchedMovie.runtime}</span>
            </p>
          </div>
        )}
      </li>
    </>
  );
}

export default ListItem;
