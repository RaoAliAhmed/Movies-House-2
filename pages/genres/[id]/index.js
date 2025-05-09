// pages/genres/[id].js
import { data } from '../../../lib/data';
import Link from 'next/link';

export async function getStaticPaths() {
  const paths = data.genres.map(genre => ({
    params: { id: genre.id }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const genre = data.genres.find(g => g.id === params.id);
  const movies = data.movies.filter(m => m.genreId === params.id);

  return {
    props: {
      genre,
      movies
    }
  };
}

export default function GenrePage({ genre, movies }) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Genre: {genre.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600">{movie.description.slice(0, 100)}...</p>
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
    </div>
  );
}
