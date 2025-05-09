import "@/styles/globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import axios from 'axios';
import { useEffect } from 'react';

// Configure axios defaults
axios.defaults.baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com' 
  : 'http://localhost:3000';

export default function App({ Component, pageProps }) {
  // Remove the server-side injected CSS (this is for Material-UI or other CSS-in-JS libraries)
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
