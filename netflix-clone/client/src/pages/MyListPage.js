import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaPlay } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import TrailerModal from '../components/TrailerModal';

const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const MyListPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    axios.get('/watchlist')
      .then(({ data }) => setWatchlist(data.watchlist || []))
      .catch(() => toast.error('Failed to load watchlist'))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await axios.delete(`/watchlist/${movieId}`);
      setWatchlist(prev => prev.filter(w => w.movieId !== movieId));
      toast.info('Removed from My List');
    } catch {
      toast.error('Failed to remove');
    }
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="pt-24 px-8 md:px-16 pb-12">
        <h1 className="text-white text-3xl font-bold mb-8">My List</h1>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => <div key={i} className="skeleton rounded aspect-video" />)}
          </div>
        ) : watchlist.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-xl mb-4">Your list is empty</p>
            <p className="text-gray-600">Browse movies and add them to your list</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchlist.map(item => (
              <div key={item._id} className="relative group rounded overflow-hidden cursor-pointer">
                <img
                  src={`${IMG_BASE}${item.backdrop_path || item.poster_path}`}
                  alt={item.title}
                  className="w-full aspect-video object-cover group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setTrailer({ movieId: item.movieId, mediaType: item.media_type })}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40 transition-colors"
                  >
                    <FaPlay size={14} />
                  </button>
                  <button
                    onClick={() => handleRemove(item.movieId)}
                    className="bg-red-600/80 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.release_date?.split('-')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {trailer && <TrailerModal movieId={trailer.movieId} mediaType={trailer.mediaType} onClose={() => setTrailer(null)} />}
    </div>
  );
};

export default MyListPage;
