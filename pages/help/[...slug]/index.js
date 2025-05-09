import { useRouter } from 'next/router';

export default function HelpPage() {
  const { slug = [] } = useRouter().query;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-4">Help</h1>

      <div className="bg-white p-6 rounded-xl shadow text-gray-800">
        <p className="text-lg">
          {slug.length ? (
            <>
              You are viewing help for: <span className="font-medium">{slug.join(' / ')}</span>
            </>
          ) : (
            'Welcome to the Main Help Page. Select a topic to get started.'
          )}
        </p>
      </div>

      <div className="text-center mt-6">
        <a href="/" className="text-blue-500 hover:underline text-sm">← Back to Home</a>
      </div>
    </div>
  );
}
