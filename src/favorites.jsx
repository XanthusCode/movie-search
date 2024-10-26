import PropTypes from 'prop-types';

const Favorites = ({ favorites, setFavorites }) => {
  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(newFavorites);
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No hay favoritos agregados.</p>
      ) : (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <button onClick={() => removeFromFavorites(movie.id)}>
                    Eliminar de Favoritos
                </button>
              </div>
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
  setFavorites: PropTypes.func.isRequired,
};

export default Favorites;
