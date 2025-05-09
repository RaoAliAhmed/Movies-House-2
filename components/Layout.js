import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode, mounted } = useTheme();

  // Apply initial body class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }

  return (
    <div className="min-h-screen">
      <nav className="p-4 shadow-md" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <Link href="/" className="font-bold text-xl hover:text-blue-500 transition-colors">
              Movies House
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/movies" className="hover:text-blue-500 transition-colors">
                Movies
              </Link>
              <Link href="/genres" className="hover:text-blue-500 transition-colors">
                Genres
              </Link>
              <Link href="/directors" className="hover:text-blue-500 transition-colors">
                Directors
              </Link>
            </div>
          </div>
          <div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
} 