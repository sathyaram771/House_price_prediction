// src/app/layout.tsx

import './globals.css'; // Import any global styles you need

export const metadata = {
  title: 'Housing Price Predictor',
  description: 'Predict house prices using machine learning models.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* You can add other meta tags or links here */}
        <meta name="description" content="Housing price prediction using machine learning." />
      </head>
      <body>
        <header>
          <h1>Housing Price Predictor</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 Housing Price Predictor</p>
        </footer>
      </body>
    </html>
  );
}


