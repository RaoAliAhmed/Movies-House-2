# Movies House

A Next.js web application for browsing movies, genres, and directors with MongoDB backend and dark mode support.

## Features

- Browse movies with filtering by genre and search functionality
- View movie details including director information
- Browse genres and directors
- Dark mode toggle using React Context API
- MongoDB database integration
- Next.js API routes for backend functionality

## Tech Stack

- Next.js 15.3.1
- React 19.0.0
- MongoDB
- Tailwind CSS
- SWR for client-side data fetching
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (connection string is already configured)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Movies-House
```

2. Install dependencies
```bash
npm install
```

3. Seed the database
```bash
npm run seed
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Routes

### Movies API
- GET `/api/movies` - Get all movies
- GET `/api/movies/[id]` - Get movie details by ID

### Genres API
- GET `/api/genres` - Get all genres
- GET `/api/genres/[id]/movies` - Get movies by genre ID

### Directors API
- GET `/api/directors` - Get all directors with their movies
- GET `/api/directors/[id]` - Get director details by ID

## Project Structure

- `/pages` - Next.js pages and API routes
- `/components` - React components
- `/lib` - Utility functions and data
- `/styles` - Global CSS styles

## Dark Mode

The application includes a dark mode toggle that persists user preferences in localStorage. The theme context is implemented using React Context API.
