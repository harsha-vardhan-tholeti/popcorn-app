/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./movieDetails.css";
import StarRating from "../star-rating/StarRating";
import Button from "../../utils/button/Button";

const key = "d2149435";

function MovieDetail({ selectedMovie, watched, setWatched }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSelectedMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovie}`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedMovieDetails();
  }, [selectedMovie]);

  const handleWatchedList = () => {
    const newMovie = {
      id: selectedMovie,
      title: movieDetails.Title,
      poster: movieDetails.Poster,
      rating: +movieDetails.Ratings[0]?.Value.slice(0, 3),
      userRating,
      runtime: movieDetails.Runtime,
    };
    setWatched((prevWatched) => [...prevWatched, newMovie]);
    localStorage.setItem("watched", JSON.stringify([...watched, newMovie]));
  };

  return (
    <div className="movie-details">
      {loading ? (
        <p>Loading...</p>
      ) : movieDetails ? (
        <>
          <div className="movie-details-header">
            <div className="header-poster">
              <img src={movieDetails.Poster} alt={movieDetails.Title} />
            </div>
            <div className="header-summary">
              <div className="summary-details">
                <h1 className="header-title">{movieDetails.Title}</h1>
                <div className="header-detail">
                  <span className="released">{movieDetails.Released}</span>
                  <span>{movieDetails.Runtime}</span>
                </div>
                <div className="header-detail">
                  <p>{movieDetails.Genre}</p>
                </div>
                <div className="header-detail">
                  <p>
                    ⭐️ {movieDetails.Ratings[0]?.Value.slice(0, 3)} IMDb rating
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-details-main">
            <div className="star-rating">
              <div className="rating-value">
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              </div>
              <Button onClick={handleWatchedList}>+ Add to List</Button>
            </div>

            <p className="detailed-info">{movieDetails.Plot}</p>
            <p className="detailed-info">Starring {movieDetails.Actors}</p>
            <p className="detailed-info">Directed By {movieDetails.Director}</p>
          </div>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default MovieDetail;
