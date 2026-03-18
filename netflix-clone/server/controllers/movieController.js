const axios = require('axios');

const TMDB_BASE = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: API_KEY }
});

// @desc    Get trending movies/tv
// @route   GET /api/movies/trending
exports.getTrending = async (req, res) => {
  try {
    const { data } = await tmdb.get('/trending/all/week');
    res.json({ success: true, results: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trending content' });
  }
};

// @desc    Get movies by category
// @route   GET /api/movies/:category
exports.getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = {
      popular: '/movie/popular',
      top_rated: '/movie/top_rated',
      upcoming: '/movie/upcoming',
      now_playing: '/movie/now_playing',
      action: '/discover/movie',
      comedy: '/discover/movie',
      horror: '/discover/movie',
      romance: '/discover/movie',
      documentaries: '/discover/movie',
      tv_popular: '/tv/popular',
      tv_top_rated: '/tv/top_rated',
      netflix_originals: '/discover/tv'
    };

    const genreMap = { action: 28, comedy: 35, horror: 27, romance: 10749, documentaries: 99 };
    const endpoint = validCategories[category];

    if (!endpoint) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const params = {};
    if (genreMap[category]) params.with_genres = genreMap[category];
    if (category === 'netflix_originals') params.with_networks = 213;

    const { data } = await tmdb.get(endpoint, { params });
    res.json({ success: true, results: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch movies' });
  }
};

// @desc    Get movie details
// @route   GET /api/movies/details/:id
exports.getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { type = 'movie' } = req.query;
    const { data } = await tmdb.get(`/${type}/${id}`, {
      params: { append_to_response: 'videos,credits,similar' }
    });
    res.json({ success: true, movie: data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch movie details' });
  }
};

// @desc    Search movies/tv
// @route   GET /api/movies/search?q=query
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, message: 'Search query required' });
    const { data } = await tmdb.get('/search/multi', { params: { query: q } });
    res.json({ success: true, results: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};

// @desc    Get banner movie
// @route   GET /api/movies/banner
exports.getBanner = async (req, res) => {
  try {
    const { data } = await tmdb.get('/trending/all/day');
    const bannerMovie = data.results[Math.floor(Math.random() * 5)];
    const details = await tmdb.get(`/${bannerMovie.media_type || 'movie'}/${bannerMovie.id}`, {
      params: { append_to_response: 'videos' }
    });
    res.json({ success: true, movie: details.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch banner' });
  }
};
