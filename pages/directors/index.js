// pages/directors/index.js
import useSWR from 'swr';
import Link from 'next/link';
import Layout from '@/components/Layout';

const fetcher = url => fetch(url).then(res => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return (
    <Layout>
      <div className="text-center text-red-500 mt-6">Failed to load</div>
    </Layout>
  );
  
  if (!data) return (
    <Layout>
      <div className="text-center mt-6">Loading...</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Directors</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.map(director => (
            <div
              key={director.id}
              className="card rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{director.name}</h2>
              <p className="text-sm mb-3">{director.biography}</p>

              {director.movies && director.movies.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-1">Movies Directed:</h3>
                  <ul className="list-disc list-inside text-sm text-blue-600">
                    {director.movies.map(movie => (
                      <li key={movie.id}>
                        <Link href={`/movies/${movie.id}`} className="hover:underline">
                          {movie.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-blue-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
