# URL Shortener

A simple URL shortener built with Vue.js and Node.js.

## Features
- Shorten long URLs to manageable links
- Copy shortened URLs with one click
- Redirect to original URLs
- Persistent storage with MongoDB

## Setup

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Backend
1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
- Copy `.env.example` to `.env`
- Update MongoDB connection string

4. Start the server:
```bash
npm start
```

### Frontend
1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables
Create a `.env` file in the Backend directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/url-shortener
```

## Tech Stack
- Frontend: Vue.js + TypeScript
- Backend: Node.js + Express
- Database: MongoDB
- Tools: Crypto for URL hashing

## API Endpoints
- `POST /url` - Create short URL
- `GET /url/:key` - Redirect to original URL