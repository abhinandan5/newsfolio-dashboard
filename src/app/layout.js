import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Newsfolio Dashboard | by Abhinandan',
  description: 'A news and payout dashboard assignment, built with Next.js.',
};

// This script runs before the page hydrates to prevent theme flicker
const ThemeScript = () => {
  const script = `
    (function() {
      try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })()
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning is important here
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This meta tag helps prevent hydration errors on iOS */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>
        <ThemeScript />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}