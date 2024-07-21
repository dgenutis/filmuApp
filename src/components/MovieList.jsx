import "./MovieList.css";
import Modal from "./Modal";
import { useState } from "react";

const MovieList = ({
  movies,
  categories,
  onSave,
  savedMovies,
  selectedCategory,
  fetchMovieTrailers,
  searchQuery,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalTrailerUrl, setModalTrailerUrl] = useState("");
  const [trailers, setTrailers] = useState({});

  const handleFetchTrailers = async (movieId) => {
    const movieTrailers = await fetchMovieTrailers(movieId);
    setTrailers((prevTrailers) => ({
      ...prevTrailers,
      [movieId]: movieTrailers,
    }));

    if (movieTrailers.length > 0) {
      handleTrailerClick(
        `https://www.youtube.com/embed/${movieTrailers[0].key}`
      );
    } else {
      setModalContent("Trailer doesn't exist");
      setModalImageUrl("");
      setModalTrailerUrl("");
      setShowModal(true);
    }
  };

  const handleSave = (movie) => {
    onSave(movie);
  };

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = categories.find((category) => category.id === id);
        return genre ? genre.name : "Unknown";
      })
      .join(", ");
  };

  const handleOverviewClick = (overview, imageUrl) => {
    setModalContent(overview);
    setModalImageUrl(imageUrl);
    setModalTrailerUrl("");
    setShowModal(true);
  };

  const handleTrailerClick = (trailerUrl) => {
    setModalTrailerUrl(trailerUrl);
    setModalContent(""); 
    setModalImageUrl(""); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTrailerUrl(""); 
    setModalContent(""); 
    setModalImageUrl(""); 
  };

  return (
    <>
      <div className="list-title">
        <h2>
          {searchQuery
            ? `Results "${searchQuery}"`
            : selectedCategory
            ? selectedCategory.name
            : "Movie List"}
        </h2>
      </div>
      <div className="movie-list">
        {movies.slice(0, 10).map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/200x300?text=No+Image";
              }}
            />
            <h3>{movie.title}</h3>

            <div className="middle">
              <p>
                <b>Genre:</b> {getGenreNames(movie.genre_ids)}
              </p>
              <p style={{ padding: "15px" }}>
                <b>Release Date:</b> {movie.release_date}
              </p>
              <div className="rating">
                <svg
                  color="yellow"
                  stroke="currentColor"
                  fill="yellow"
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
                {movie.vote_average.toFixed(1)}
              </div>
              <div className="rating-save">
                {!savedMovies.includes(movie.id) && (
                  <button onClick={() => handleSave(movie)}>Save</button>
                )}
                <button
                  className="overview-button"
                  onClick={() =>
                    handleOverviewClick(
                      movie.overview,
                      `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    )
                  }
                >
                  Overview
                </button>
                <button onClick={() => handleFetchTrailers(movie.id)}>
                  Trailer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        content={modalContent}
        imageUrl={modalImageUrl}
        trailerUrl={modalTrailerUrl}
      />
    </>
  );
};

export default MovieList;
