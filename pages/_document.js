import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var mode = localStorage.getItem('darkMode');
                if (mode === 'true') {
                  document.documentElement.classList.add('dark-mode');
                } else if (mode === 'false') {
                  document.documentElement.classList.add('light-mode');
                } else {
                  // Check system preference
                  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark-mode');
                  } else {
                    document.documentElement.classList.add('light-mode');
                  }
                }
              } catch (e) {}
            })();
          `
        }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
