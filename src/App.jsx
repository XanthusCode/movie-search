import { useState } from "react";
import axios from "axios";
import "./App.css";

function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState(false);

  const searchMovies = async () => {
    if (!query) {
      setError("Please enter a search term");
      return;
    }

    try {
      const api = "9a190d11e41dc4d29e4779867f9a2faa"; // Definimos la clave directamente
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
      console.error(
        "Error details:",
        err.response ? err.response.data : err.message
      );
      setError("An error occurred while fetching movies");
    }
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true })); // Actualiza el estado de error de la imagen
  };

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
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              onError={() => handleImageError(movie.id)} // Maneja el error de la imagen
              style={{ display: imageErrors[movie.id] ? 'none' : 'block' }} // Oculta si hay error
            />
            {imageErrors[movie.id] && <p>Imagen no disponible</p>} {/* Mensaje de error individual */}
            <div className="movie-info">
              <h3>{movie.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
