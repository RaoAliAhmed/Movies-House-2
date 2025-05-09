import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useTheme } from '@/lib/ThemeContext';

export async function getStaticProps() {
  try {
    const moviesResponse = await axios.get(`${process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000'}/api/movies`);
      
    const genresResponse = await axios.get(`${process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000'}/api/genres`);
    
    return {
      props: {
        movies: moviesResponse.data,
        genres: genresResponse.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        movies: [],
        genres: [],
      },
      revalidate: 10,
    };
  }
}

export default function Movies({ movies, genres }) {
  const [genre, setGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = useTheme();
  
  const filteredByGenre = genre ? movies.filter(m => m.genreId === genre) : movies;
  const filteredMovies = searchQuery
    ? filteredByGenre.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredByGenre;

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-sm mb-4">
          <Link href="/" className="hover:underline">Home</Link> / Movies
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">All Movies</h1>

        <div className="mb-6 flex justify-center gap-4">
          {/* Genre filter */}
          <select
            onChange={e => setGenre(e.target.value)}
            className="border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          {/* Search input */}
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search movies by title..."
            className="border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredMovies.length === 0 ? (
          <p className="text-center">No movies found matching the search criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="card p-5 rounded-xl shadow-md hover:shadow-xl transition">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-sm mt-2">{movie.description.slice(0, 100)}...</p>
                <p className="text-sm mt-1">Year: {movie.releaseYear}</p>
                <Link
                  href={`/movies/${movie.id}`}
                  className="inline-block mt-3 text-blue-500 hover:underline text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
