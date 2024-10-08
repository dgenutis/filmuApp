import './SaveMovies.css'

const SavedMovies = ({ savedMovies, onClear, onRemove, getGenreNames }) => {
  return (
    <>
      <div className="clear-title">
        <h2>Saved Movies</h2>
      </div>
      <div className="saved-movies">
        {savedMovies.map((movie) => (
          <div key={movie.id} className="saved-movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src =
                  "https://via.placeholder.com/200x300?text=No+Image";
              }}
            />
            <h3>{movie.title}</h3>
            <div className="middle-save">
              <p>
                <b>Genre:</b> {getGenreNames(movie.genre_ids)}
              </p>
              <p>
                <b>Release Date:</b> {movie.release_date}
              </p>
              <p>
                <svg
                  color="yellow"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>{" "}
                {movie.vote_average}
           
                  <button onClick={() => onRemove(movie.id)}>Clear</button>
            
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="clear-button">
        <button onClick={onClear}>Clear All Saved Movies</button>
      </div>
    </>
  );
};

export default SavedMovies;
