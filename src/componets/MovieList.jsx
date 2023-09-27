import PropTypes from 'prop-types';

const MovieItem = ({ movie }) => {
  return (
    <article className="movie" key={movie.id}>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        <p>Fecha de lanzamiento: {movie.release_date}</p>
      </div>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      )}
    </article>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
  }),
};

const MovieList = ({ data }) => {
  return (
    <section className="container">
      {data.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </section>
  );
};

MovieList.propTypes = {
  data: PropTypes.array,
};

export default MovieList;
