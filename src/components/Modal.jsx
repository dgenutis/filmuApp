import "./Modal.css";

const Modal = ({ show, onClose, content, imageUrl, trailerUrl }) => {
  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {trailerUrl ? (
          <iframe
            className="trailer"
            width="560"
            height="315"
            src={trailerUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        ) : (
          <>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Movie Poster"
                className="modal-image"
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src =
                    "https://via.placeholder.com/200x300?text=No+Image";
                }}
              />
            )}
            <div>{content}</div>
            {!imageUrl && !content && (
              <div className="no-trailer-message">Trailer doesn't exist</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
