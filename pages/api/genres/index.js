const clientPromise = require('../../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('movies-house');
    
    const genres = await db.collection('genres').find({}).toArray();
    
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
} 