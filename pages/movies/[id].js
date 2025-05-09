import Link from 'next/link';
import Layout from '@/components/Layout';
import axios from 'axios';

export async function getStaticPaths() {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000';
      
    const response = await axios.get(`${baseUrl}/api/movies`);
    const paths = response.data.map(movie => ({ params: { id: movie.id } }));
    
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching movie paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000';
      
    const movieResponse = await axios.get(`${baseUrl}/api/movies/${params.id}`);
    const movie = movieResponse.data;
    
    if (!movie) return { notFound: true };
    
    const directorResponse = await axios.get(`${baseUrl}/api/directors/${movie.directorId}`);
    const director = directorResponse.data;

    return {
      props: { movie, director },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return { notFound: true };
  }
}

export default function MovieDetail({ movie, director }) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 text-center">{movie.title}</h1>

        <div className="card p-6 rounded-xl shadow-md">
          <p className="text-lg mb-4">{movie.description}</p>
          <p className="text-sm mb-2">Released: {movie.releaseYear}</p>
          <p className="text-sm mb-2">Rating: {movie.rating}</p>

          <Link
            href={`/directors/${director.id}`}
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
    </Layout>
  );
}
