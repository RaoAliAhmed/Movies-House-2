const clientPromise = require('../../../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db('movies-house');
    
    // Find movies that belong to the specified genre
    const movies = await db.collection('movies').find({ genreId: id }).toArray();
    
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ error: 'Failed to fetch movies by genre' });
  }
} 