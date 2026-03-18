import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';

const ROWS = [
  { title: 'Trending Now', url: '/movies/trending' },
  { title: 'Netflix Originals', url: '/movies/netflix_originals', isLarge: true },
  { title: 'Top Rated', url: '/movies/top_rated' },
  { title: 'Action Movies', url: '/movies/action' },
  { title: 'Comedy Movies', url: '/movies/comedy' },
  { title: 'Horror Movies', url: '/movies/horror' },
  { title: 'Romance Movies', url: '/movies/romance' },
  { title: 'Documentaries', url: '/movies/documentaries' },
  { title: 'Popular on TV', url: '/movies/tv_popular' },
];

const HomePage = () => {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios.get('/movies/banner').then(({ data }) => setBannerMovie(data.movie)).catch(() => {});
    axios.get('/watchlist').then(({ data }) => setWatchlist(data.watchlist || [])).catch(() => {});
  }, []);

  const handleToggleWatchlist = useCallback(async (movie) => {
    const isIn = watchlist.some(w => w.movieId === movie.id);
    try {
      if (isIn) {
        await axios.delete(`/watchlist/${movie.id}`);
        setWatchlist(prev => prev.filter(w => w.movieId !== movie.id));
        toast.info('Removed from My List');
      } else {
        const { data } = await axios.post('/watchlist', {
          movieId: movie.id,
          title: movie.title || movie.name,
          overview: movie.overview,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date || movie.first_air_date,
          media_type: movie.media_type || 'movie'
        });
        setWatchlist(prev => [...prev, data.item]);
        toast.success('Added to My List');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  }, [watchlist]);

  const bannerInWatchlist = bannerMovie && watchlist.some(w => w.movieId === bannerMovie.id);

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <Banner
        movie={bannerMovie}
        inWatchlist={bannerInWatchlist}
        onToggleWatchlist={() => bannerMovie && handleToggleWatchlist(bannerMovie)}
      />
      <div className="-mt-16 relative z-10 pb-12">
        {ROWS.map(row => (
          <Row
            key={row.url}
            title={row.title}
            fetchUrl={row.url}
            isLarge={row.isLarge}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
