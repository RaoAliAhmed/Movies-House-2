import Link from 'next/link';
import Layout from '@/components/Layout';
import axios from 'axios';

export async function getStaticProps() {
  try {
    // Fetch movies from our API
    const response = await axios.get(`${process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000'}/api/movies`);
    
    // Get only the first 3 movies for the trending section
    const trendingMovies = response.data.slice(0, 3);
    
    return {
      props: {
        trendingMovies,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return {
      props: {
        trendingMovies: [],
      },
      revalidate: 10,
    };
  }
}

export default function Home({ trendingMovies }) {
  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Trending Movies</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingMovies.map(movie => (
            <div key={movie.id} className="card p-4 rounded-xl shadow-md hover:shadow-xl transition">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm mt-2">{movie.description.slice(0, 100)}...</p>
              <p className="text-sm mt-1">Year: {movie.releaseYear}</p>
              <Link
                href={`/movies/${movie.id}`}
                className="inline-block mt-2 text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => window.location.href = '/genres'}
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            Browse Genres
          </button>
        </div>
      </div>
    </Layout>
  );
}
