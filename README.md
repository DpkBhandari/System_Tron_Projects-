# 🚀 MERN Stack Projects Bundle

Four production-ready full-stack web applications built with:
- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (where applicable)

---

## 📁 Project Structure

```
mern-projects/
├── netflix-clone/      → 🎬 Netflix Clone (JWT auth, TMDB API, watchlist)
├── todo-app/           → ✅ TaskFlow Todo App (CRUD, filters, priorities)
├── connect-four/       → 🔴🟡 Connect Four Game (Socket.io multiplayer)
└── calculator/         → 🧮 Calculator (history, scientific mode, dark/light)
```

Each project has:
```
project/
├── client/   → React + Tailwind frontend (port 3000)
└── server/   → Express + MongoDB backend (unique port per project)
```

---

## ⚡ Quick Start (Any Project)

```bash
# 1. Backend
cd <project>/server
npm install
cp .env.example .env
# Edit .env with your MONGODB_URI
npm run dev

# 2. Frontend (new terminal)
cd <project>/client
npm install
npm start
```

---

## 🎬 Project 1: Netflix Clone
**Port**: Server 5000 | Client 3000

**Special requirement**: Get a free TMDB API key at https://www.themoviedb.org/

Features:
- JWT Authentication (Register / Login)
- Home with Trending, Popular, Top Rated, genre rows
- Dynamic banner with random trending content
- Movie cards with hover reveal + trailer button
- YouTube trailer modal
- Search movies & TV shows
- My List (saved to MongoDB)
- Responsive Navbar with scroll effect

---

## ✅ Project 2: TaskFlow — Todo App
**Port**: Server 5001 | Client 3000

Features:
- Add / Edit / Delete tasks with inline editing
- Animated custom checkboxes
- Priority levels: Low / Medium / High (color-coded)
- Due dates with overdue detection
- Category tagging
- Filter: All / Pending / Completed
- Stats dashboard + progress bar
- Bulk clear completed
- Persistent MongoDB storage

---

## 🔴🟡 Project 3: Connect Four
**Port**: Server 5002 | Client 3000

Features:
- Animated game board (6×7 grid)
- Custom player names
- Win detection: horizontal, vertical, diagonal
- Animated drop and win-flash effects
- Session score tracking
- Real-time multiplayer via Socket.io (room-based)
- Match history in MongoDB
- Space/gaming aesthetic with Orbitron font

---

## 🧮 Project 4: Calculator
**Port**: Server 5003 | Client 3000

Features:
- Basic: + − × ÷ %
- Scientific: sin cos tan log ln √ x² 1/x π e
- Full keyboard support
- Calculation history (MongoDB)
- Recall & delete history entries
- Dark / Light theme toggle
- Safe expression evaluation (no eval())
- Divide-by-zero error handling

---

## 🌍 Environment Variables

Each project's `server/.env.example` shows all required variables.
Copy to `.env` and fill in your values before running.

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing (Netflix only) |
| `TMDB_API_KEY` | TMDB API key (Netflix only) |
| `PORT` | Server port (defaults set per project) |

---

## 🛠 Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### MongoDB Atlas (Cloud — Free)
1. Go to https://www.mongodb.com/atlas
2. Create a free cluster
3. Get connection string → use as `MONGODB_URI`

---

## 📦 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Styling | Tailwind CSS 3, Custom CSS animations |
| State | React Context API, Custom Hooks |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose ODM |
| Auth | JWT, bcryptjs |
| Realtime | Socket.io (Connect Four) |
| Notifications | react-toastify |
| External API | TMDB (Netflix Clone) |
