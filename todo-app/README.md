# ✅ TaskFlow — Full Stack Todo App

A sleek, feature-rich todo application with dark theme, built with MERN + Tailwind CSS.

## Features
- Add / Edit / Delete tasks
- Mark complete with animated checkbox
- Filter: All / Pending / Completed
- Priority levels (Low / Medium / High) with color coding
- Due dates with overdue detection
- Categories
- Stats dashboard with progress bar
- Clear completed in bulk
- Persistent MongoDB storage
- Fully responsive

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env
# Set MONGODB_URI in .env
npm run dev        # runs on port 5001
```

### Frontend
```bash
cd client
npm install
npm start          # runs on port 3000
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /api/tasks | Get all tasks (supports ?filter=completed/pending) |
| POST   | /api/tasks | Create task |
| PUT    | /api/tasks/:id | Update task |
| PATCH  | /api/tasks/:id/toggle | Toggle complete |
| PATCH  | /api/tasks/completed/clear | Delete all completed |
| DELETE | /api/tasks/:id | Delete task |
