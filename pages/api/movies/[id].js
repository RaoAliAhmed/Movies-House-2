const clientPromise = require('../../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db('movies-house');
    
    const movie = await db.collection('movies').findOne({ id: id });
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
} 