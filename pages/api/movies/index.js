const clientPromise = require('../../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('movies-house');
    
    const movies = await db.collection('movies').find({}).toArray();
    
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
} 