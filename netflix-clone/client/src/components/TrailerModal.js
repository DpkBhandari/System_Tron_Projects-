import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const TrailerModal = ({ videoKey, movieId, mediaType = 'movie', onClose }) => {
  const [key, setKey] = useState(videoKey);

  useEffect(() => {
    if (!videoKey && movieId) {
      axios.get(`/movies/details/${movieId}?type=${mediaType}`)
        .then(({ data }) => {
          const trailer = data.movie?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
          if (trailer) setKey(trailer.key);
        })
        .catch(() => {});
    }
  }, [videoKey, movieId, mediaType]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors"
        >
          <FaTimes size={18} />
        </button>

        {key ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=0&controls=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-lg">
            <p>No trailer available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
