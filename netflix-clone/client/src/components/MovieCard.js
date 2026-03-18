import React, { useState } from 'react';
import { FaPlay, FaPlus, FaCheck, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import TrailerModal from './TrailerModal';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie, onToggleWatchlist, inWatchlist }) => {
  const [hovered, setHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date || '').split('-')[0];
  const imgSrc = movie.backdrop_path || movie.poster_path;

  if (!imgSrc) return null;

  return (
    <>
      <div
        className="relative flex-shrink-0 cursor-pointer rounded overflow-hidden movie-card"
        style={{ width: '200px', height: '113px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={`${IMG_BASE}${imgSrc}`}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {hovered && (
          <div className="absolute inset-0 bg-[#181818] rounded shadow-2xl z-20"
            style={{ transform: 'scale(1.5)', transformOrigin: 'center', width: '200px', height: '180px', top: '-33px' }}>
            <img
              src={`${IMG_BASE}${movie.backdrop_path || movie.poster_path}`}
              alt={title}
              className="w-full h-28 object-cover rounded-t"
            />
            <div className="p-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex gap-1">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-white rounded-full p-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <FaPlay className="text-black text-xs" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleWatchlist && onToggleWatchlist(movie); }}
                    className="border border-gray-400 rounded-full p-1.5 hover:border-white transition-colors"
                  >
                    {inWatchlist ? <FaCheck className="text-white text-xs" /> : <FaPlus className="text-white text-xs" />}
                  </button>
                  <button className="border border-gray-400 rounded-full p-1.5 hover:border-white transition-colors">
                    <FaThumbsUp className="text-white text-xs" />
                  </button>
                </div>
                <button className="border border-gray-400 rounded-full p-1.5 hover:border-white transition-colors">
                  <FaChevronDown className="text-white text-xs" />
                </button>
              </div>
              <p className="text-white text-xs font-bold truncate">{title}</p>
              <div className="flex items-center gap-1.5 text-xs mt-0.5">
                <span className="text-green-400 font-semibold">{Math.round((movie.vote_average || 0) * 10)}%</span>
                {year && <span className="text-gray-400">{year}</span>}
                {movie.adult === false && <span className="border border-gray-500 text-gray-400 px-1 text-xs">U/A</span>}
              </div>
              {movie.genre_ids && (
                <div className="flex gap-1 mt-1 flex-wrap">
                  {movie.genre_ids.slice(0, 2).map(id => (
                    <span key={id} className="text-gray-300 text-xs">• Genre</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showTrailer && (
        <TrailerModal movieId={movie.id} mediaType={movie.media_type || 'movie'} onClose={() => setShowTrailer(false)} />
      )}
    </>
  );
};

export default MovieCard;
