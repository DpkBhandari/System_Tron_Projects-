import React, { useState } from 'react';
import { FaPlay, FaInfoCircle, FaPlus, FaCheck } from 'react-icons/fa';
import TrailerModal from './TrailerModal';

const IMG_BASE = 'https://image.tmdb.org/t/p/original';

const Banner = ({ movie, inWatchlist, onToggleWatchlist }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!movie) return (
    <div className="h-[85vh] skeleton" />
  );

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const title = movie.title || movie.name || movie.original_title;
  const overview = movie.overview?.length > 200 ? movie.overview.substring(0, 200) + '...' : movie.overview;

  return (
    <>
      <div className="relative h-[85vh] flex items-center"
        style={{ backgroundImage: `url(${IMG_BASE}${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        <div className="banner-fade absolute inset-0" />

        <div className="relative z-10 px-8 md:px-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">{title}</h1>

          <div className="flex items-center gap-3 mb-4 text-sm text-gray-300">
            <span className="text-green-400 font-semibold">{Math.round(movie.vote_average * 10)}% Match</span>
            <span>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
            {movie.runtime && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
          </div>

          <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6">{overview}</p>

          <div className="flex gap-3">
            <button
              onClick={() => trailer && setShowTrailer(true)}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              <FaPlay /> Play
            </button>

            <button
              onClick={onToggleWatchlist}
              className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-3 rounded font-bold text-sm hover:bg-gray-400/70 transition-colors"
            >
              {inWatchlist ? <FaCheck /> : <FaPlus />}
              {inWatchlist ? 'In My List' : 'My List'}
            </button>

            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-3 rounded font-bold text-sm hover:bg-gray-400/70 transition-colors"
              >
                <FaInfoCircle /> More Info
              </button>
            )}
          </div>
        </div>
      </div>

      {showTrailer && trailer && (
        <TrailerModal videoKey={trailer.key} onClose={() => setShowTrailer(false)} />
      )}
    </>
  );
};

export default Banner;
