import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import TrailerModal from '../components/TrailerModal';

const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios.get(`/movies/search?q=${encodeURIComponent(query)}`)
      .then(({ data }) => setResults(data.results?.filter(r => r.media_type !== 'person') || []))
      .catch(() => toast.error('Search failed'))
      .finally(() => setLoading(false));
  }, [query]);

  const addToList = async (movie) => {
    try {
      await axios.post('/watchlist', {
        movieId: movie.id, title: movie.title || movie.name,
        overview: movie.overview, poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path, vote_average: movie.vote_average,
        release_date: movie.release_date || movie.first_air_date,
        media_type: movie.media_type || 'movie'
      });
      toast.success('Added to My List');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add');
    }
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="pt-24 px-8 md:px-16 pb-12">
        <h2 className="text-white text-xl mb-6">
          {loading ? 'Searching...' : `Results for "${query}" — ${results.length} found`}
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => <div key={i} className="skeleton rounded aspect-video" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map(movie => (
              <div key={movie.id} className="relative group rounded overflow-hidden cursor-pointer">
                {(movie.backdrop_path || movie.poster_path) ? (
                  <img src={`${IMG_BASE}${movie.backdrop_path || movie.poster_path}`} alt={movie.title || movie.name}
                    className="w-full aspect-video object-cover group-hover:opacity-60 transition-opacity" />
                ) : (
                  <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-600 text-xs text-center px-2">{movie.title || movie.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setTrailer({ movieId: movie.id, mediaType: movie.media_type || 'movie' })}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40">
                    <FaPlay size={14} />
                  </button>
                  <button onClick={() => addToList(movie)}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40">
                    <FaPlus size={14} />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-white text-xs font-semibold truncate">{movie.title || movie.name}</p>
                  <div className="flex items-center gap-2 text-xs mt-0.5">
                    <span className="text-green-400">{Math.round((movie.vote_average || 0) * 10)}%</span>
                    <span className="text-gray-500 capitalize">{movie.media_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && results.length === 0 && query && (
          <div className="text-center py-24">
            <p className="text-gray-400 text-xl">No results found for "{query}"</p>
          </div>
        )}
      </div>
      {trailer && <TrailerModal movieId={trailer.movieId} mediaType={trailer.mediaType} onClose={() => setTrailer(null)} />}
    </div>
  );
};

export default SearchPage;
