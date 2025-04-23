import { data } from '../../lib/data';
import Link from 'next/link';

export async function getStaticPaths() {
  const paths = data.movies.map(movie => ({ params: { id: movie.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find(m => m.id === params.id);
  const director = data.directors.find(d => d.id === movie?.directorId);
  if (!movie) return { notFound: true };

  return {
    props: { movie, director },
    revalidate: 10,
  };
}

export default function MovieDetail({ movie, director }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">{movie.title}</h1>

      <div className="bg-white p-6 rounded-xl shadow-md text-gray-800">
        <p className="text-lg mb-4">{movie.description}</p>
        <p className="text-sm mb-2 text-gray-600">Released: {movie.releaseYear}</p>
        <p className="text-sm mb-2 text-gray-600">Rating: {movie.rating}</p>

        <Link
          href={`/movies/${movie.id}/director`}
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Director: {director.name}
        </Link>
      </div>

      <div className="text-center mt-6">
        <Link
          href="/movies"
          className="text-sm text-blue-400 hover:underline"
        >
          ← Back to All Movies
        </Link>
      </div>
    </div>
  );
}
