import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000';
      
    const response = await axios.get(`${baseUrl}/api/genres`);
    
    return {
      props: {
        genres: response.data
      }
    };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {
      props: {
        genres: []
      }
    };
  }
}

export default function Genres({ genres }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter genres based on search query
  const filteredGenres = searchQuery
    ? genres.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : genres;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Genres</h1>

        <div className="mb-6 flex justify-center">
          {/* Search input */}
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search genres..."
            className="border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredGenres.length === 0 ? (
          <p className="text-center">No genres found matching the search criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGenres.map(g => (
              <Link
                key={g.id}
                href={`/genres/${g.id}`}
                className="block card rounded-xl shadow p-4 text-center hover:shadow-lg transition"
              >
                {g.name}
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-blue-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
