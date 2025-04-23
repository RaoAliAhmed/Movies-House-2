import { data } from '../../lib/data';
import Link from 'next/link';
import { useState } from 'react';

export async function getServerSideProps() {
  return {
    props: {
      genres: data.genres
    }
  };
}

export default function Genres({ genres }) {
  const [searchQuery, setSearchQuery] = useState('');  // State for search query

  // Filter genres based on search query
  const filteredGenres = searchQuery
    ? genres.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))  // Filter by genre name
    : genres;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Genres</h1>

      <div className="mb-6 flex justify-center">
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search genres..."
          className="bg-black border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredGenres.length === 0 ? (
        <p className="text-center text-white">No genres found matching the search criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredGenres.map(g => (
            <Link
              key={g.id}
              href={`/genres/${g.id}`}
              className="block bg-white rounded-xl shadow p-4 text-center text-gray-800 hover:shadow-lg transition"
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
  );
}
