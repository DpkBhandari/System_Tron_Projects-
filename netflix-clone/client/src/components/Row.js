import React, { useEffect, useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import MovieCard from './MovieCard';

const Row = ({ title, fetchUrl, isLarge, watchlist, onToggleWatchlist }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(fetchUrl);
        setMovies(data.results || []);
      } catch (err) {
        console.error(`Failed to fetch ${title}:`, err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [fetchUrl, title]);

  const scroll = (dir) => {
    const row = rowRef.current;
    if (row) {
      const amount = 800;
      row.scrollLeft += dir === 'left' ? -amount : amount;
      setScrollX(row.scrollLeft);
    }
  };

  if (loading) return (
    <div className="px-4 md:px-8 mb-8">
      <h2 className="text-white text-lg font-bold mb-3">{title}</h2>
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 skeleton rounded" style={{ width: '200px', height: '113px' }} />
        ))}
      </div>
    </div>
  );

  if (!movies.length) return null;

  const watchlistIds = new Set(watchlist?.map(w => w.movieId));

  return (
    <div className="relative px-4 md:px-8 mb-8 group">
      <h2 className="text-white text-lg font-bold mb-3 hover:text-gray-300 cursor-pointer transition-colors">
        {title} <span className="text-[#54b9c5] text-sm opacity-0 group-hover:opacity-100 transition-opacity ml-2">Explore All &rsaquo;</span>
      </h2>

      {/* Left scroll button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 translate-y-2 z-10 bg-black/60 text-white p-2 rounded-r opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
      >
        <FaChevronLeft size={20} />
      </button>

      <div ref={rowRef} className="row-posters gap-2">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isLarge={isLarge}
            inWatchlist={watchlistIds?.has(movie.id)}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 translate-y-2 z-10 bg-black/60 text-white p-2 rounded-l opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default Row;
