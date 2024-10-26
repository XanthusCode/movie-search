import PropTypes from 'prop-types'; // Importa PropTypes
import './App.css';

const Modal = ({ movie, onClose, imageErrors }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="movie-details">
        <button onClick={onClose}>Back to search</button>
          <h2>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>{movie.overview}</p>
          <p>
            <strong>IMDB Rating:</strong> {movie.vote_average}
          </p>
        </div>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            style={{
              display: imageErrors[movie.id] ? 'none' : 'block',
            }}
            alt={movie.title}
          />
        )}
       
      </div>
    </div>
  );
};

// Validación de tipos con PropTypes
Modal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
  }).isRequired, // movie debe ser un objeto y es requerido
  onClose: PropTypes.func.isRequired, // onClose es una función requerida
  imageErrors: PropTypes.object.isRequired, // imageErrors es un objeto requerido
};

export default Modal;
