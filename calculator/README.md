# 🧮 Calculator — Full Stack MERN App

A sleek, modern calculator with history persistence, scientific mode, dark/light theme, and full keyboard support.

## Features
- Basic arithmetic: +, −, ×, ÷, %
- Scientific mode: sin, cos, tan, log, ln, √, x², 1/x, π, e
- Real-time display with expression preview
- Keyboard support (0-9, operators, Enter, Escape, Backspace)
- Calculation history stored in MongoDB
- Recall any past calculation
- Delete individual or all history entries
- Dark / Light theme toggle
- Safe expression evaluation (no eval() — uses expr-eval)
- Divide-by-zero error handling

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, JetBrains Mono font
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Evaluator**: expr-eval (safe, no eval())

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env
# Edit MONGODB_URI
npm run dev        # runs on port 5003
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
| POST   | /api/calculate | Evaluate expression + save |
| GET    | /api/history   | Get calculation history |
| DELETE | /api/history   | Clear all history |
| DELETE | /api/history/:id | Delete one entry |

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| 0–9 | Number input |
| + - * / | Operators (× ÷ mapped) |
| Enter or = | Calculate |
| Backspace | Delete last character |
| Escape or Delete | Clear all |
