import { data } from '../../../lib/data';

export async function getStaticPaths() {
  return {
    paths: data.movies.map(movie => ({ params: { id: movie.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find(m => m.id === params.id);
  const director = data.directors.find(d => d.id === movie?.directorId);

  return {
    props: { director }
  };
}

export default function DirectorPage({ director }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">{director.name}</h1>

      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Biography</h2>
        <p className="text-gray-700">{director.biography}</p>
      </div>

      <div className="text-center mt-6">
        <a
          href="/movies"
          className="text-sm text-blue-500 hover:underline"
        >
          ← Back to Movies
        </a>
      </div>
    </div>
  );
}
