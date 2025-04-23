import { data } from '../lib/data';
import Link from 'next/link';

export async function getStaticProps() {
  return {
    props: {
      trendingMovies: data.movies.slice(0, 3),
    },
    revalidate: 10,
  };
}

export default function Home({ trendingMovies }) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Trending Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingMovies.map(movie => (
          <div key={movie.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{movie.description.slice(0, 100)}...</p>
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
  );
}
