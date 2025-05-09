const clientPromise = require('../../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('movies-house');
    
    // Get all directors
    const directors = await db.collection('directors').find({}).toArray();
    
    // For each director, find the movies they directed
    const directorsWithMovies = await Promise.all(directors.map(async (director) => {
      const directedMovies = await db.collection('movies').find({ directorId: director.id }).toArray();
      return {
        ...director,
        movies: directedMovies
      };
    }));
    
    res.status(200).json(directorsWithMovies);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ error: 'Failed to fetch directors' });
  }
} 