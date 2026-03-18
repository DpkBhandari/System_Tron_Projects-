# 🎬 Netflix Clone — Full Stack MERN App

A pixel-perfect Netflix clone built with the MERN stack and Tailwind CSS.

## Features
- JWT Authentication (Register/Login)
- Home with dynamic categories from TMDB API
- Banner with random trending movie
- Hover cards with trailer preview
- Trailer modal (YouTube embed)
- Search movies & TV shows
- My List (saved to MongoDB)
- Responsive design

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, Axios, React Router v6
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, bcryptjs
- **API**: TMDB (The Movie Database)

## Setup

### 1. Get a TMDB API Key
- Sign up at https://www.themoviedb.org/
- Go to Settings → API → Request an API Key

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MONGODB_URI and TMDB_API_KEY
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```

## Environment Variables (server/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_secret_key
TMDB_API_KEY=your_tmdb_api_key
```

## API Routes
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login user |
| GET | /api/auth/me | Yes | Get current user |
| GET | /api/movies/trending | Yes | Trending content |
| GET | /api/movies/banner | Yes | Random banner movie |
| GET | /api/movies/:category | Yes | Movies by category |
| GET | /api/movies/search?q= | Yes | Search movies |
| GET | /api/watchlist | Yes | Get My List |
| POST | /api/watchlist | Yes | Add to My List |
| DELETE | /api/watchlist/:id | Yes | Remove from My List |
