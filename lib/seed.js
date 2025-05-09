const { MongoClient } = require('mongodb');
const { data } = require('./data');

const uri = 'mongodb+srv://zeeshanhamid17:$zee03052002@cluster0.aqabk0o.mongodb.net/';
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function seedDatabase() {
  let client;
  
  try {
    client = new MongoClient(uri, options);
    await client.connect();
    const db = client.db('movies-house');

    // Clear existing collections if they exist
    try {
      await db.collection('movies').drop();
      await db.collection('genres').drop();
      await db.collection('directors').drop();
    } catch (e) {
      console.log('Collections may not exist yet, creating them...');
    }

    // Insert data into collections
    await db.collection('movies').insertMany(data.movies);
    await db.collection('genres').insertMany(data.genres);
    await db.collection('directors').insertMany(data.directors);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

seedDatabase(); 