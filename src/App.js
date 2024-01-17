import { useEffect, useState } from "react";
import Navbar from "./utils/navbar/Navbar";
import Box from "./utils/box/Box";
import StaticButton from "./utils/static-button/StaticButton";
import List from "./utils/list/List";
import WatchedSummary from "./components/watched-summary/WatchedSummary";
import ListItem from "./utils/list-item/ListItem";
import MovieDetail from "./components/movie-detail/MovieDetail";

const key = "d2149435";

export default function App() {
  const initialWatchedState = JSON.parse(localStorage.getItem("watched")) || [];
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(initialWatchedState);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        setMovies(data.Search);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [query]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />

      <main className="main">
        <Box>
          <StaticButton isOpen={isOpen1} setIsOpen={setIsOpen1} />
          {isOpen1 && (
            <List>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                movies?.map((movie) => (
                  <ListItem
                    key={movie.imdbID}
                    movie={movie}
                    watched={watched}
                    onClick={() => setSelectedMovie(movie.imdbID)}
                  />
                ))
              )}
            </List>
          )}
        </Box>

        <Box>
          <StaticButton isOpen={isOpen2} setIsOpen={setIsOpen2} />
          {isOpen2 && (
            <>
              {selectedMovie ? (
                <MovieDetail
                  selectedMovie={selectedMovie}
                  setWatched={setWatched}
                  watched={watched}
                />
              ) : (
                <>
                  <WatchedSummary watched={watched} />
                  <List>
                    {watched.map((watchedMovie) => (
                      <ListItem
                        key={watchedMovie.id}
                        watchedMovie={watchedMovie}
                      />
                    ))}
                  </List>
                </>
              )}
            </>
          )}
        </Box>
      </main>
    </>
  );
}
