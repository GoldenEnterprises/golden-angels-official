import './globals.css';

export const metadata = {
  title: 'Golden Angels | Guarding Vision with Divine Care',
  description: 'Golden Angels is the premier angel investment network of Golden Enterprises. We invest in visionary people and transformative ideas that create lasting impact and generational wealth.',
  keywords: 'angel investing, venture capital, Golden Angels, Golden Enterprises, startup funding, innovation',
  openGraph: {
    title: 'Golden Angels | The Future of Angel Investing',
    description: 'Guarding Vision with Divine Care. Join the premier angel investment network.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030303" />
      </head>
      <body>{children}</body>
    </html>
  );
}
