const clientPromise = require('../../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db('movies-house');
    
    // Find the director
    const director = await db.collection('directors').findOne({ id: id });
    
    if (!director) {
      return res.status(404).json({ error: 'Director not found' });
    }
    
    // Find movies directed by this director
    const directedMovies = await db.collection('movies').find({ directorId: id }).toArray();
    
    // Return director with their movies
    const directorWithMovies = {
      ...director,
      movies: directedMovies
    };
    
    res.status(200).json(directorWithMovies);
  } catch (error) {
    console.error('Error fetching director:', error);
    res.status(500).json({ error: 'Failed to fetch director' });
  }
} 