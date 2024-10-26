import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import "./App.css";
import Modal from "./Modal";

function MovieSearch({ favorites, setFavorites }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    if (!query) {
      setError("Please enter a search term");
      return;
    }

    try {
      const api = "9a190d11e41dc4d29e4779867f9a2faa";
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: api,
          query: query,
        },
      });

      if (res.data.results.length > 0) {
        setMovies(res.data.results);
        setError("");
      } else {
        setError("No movies found");
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching movies");
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
        const api = "9a190d11e41dc4d29e4779867f9a2faa"; // Definimos la clave directamente
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: api,
          append_to_response: "credits",
        },
      });
      setSelectedMovie(res.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching movie details!");
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(newFavorites);
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

  return (
    <div>
      <h1>Movies Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
      />
      <button onClick={searchMovies}>Search</button>
      {error && <p>{error}</p>}

      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          imageErrors={imageErrors}
        />
      )}

      {!selectedMovie && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movie-card" onClick={() => fetchMovieDetails(movie.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                onError={() => handleImageError(movie.id)}
                style={{
                  display: imageErrors[movie.id] ? "none" : "block",
                }}
                alt={movie.title}
              />
              {imageErrors[movie.id] && <p>Image not available</p>}
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isFavorite(movie.id)
                      ? removeFromFavorites(movie.id)
                      : addToFavorites(movie);
                  }}
                >
                  {isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

MovieSearch.propTypes = {
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
};

export default MovieSearch;
