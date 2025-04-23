// api/directors.js
import { data } from '../../lib/data';

export default function handler(req, res) {
  // Add movies directed by each director to their data
  const directorsWithMovies = data.directors.map(director => {
    const directedMovies = data.movies.filter(movie => movie.directorId === director.id);
    return {
      ...director,
      movies: directedMovies
    };
  });

  res.status(200).json(directorsWithMovies);
}
