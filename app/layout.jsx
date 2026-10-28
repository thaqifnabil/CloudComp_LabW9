import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'CLAIM READY - Free Warranty Claim Checklist',
  description: 'A free checklist for anyone about to file a warranty claim. Decided on facts, in writing.',
  keywords: ['warranty claim', 'consumer rights', 'claim ready', 'warranty checklist'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alike&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Source+Code+Pro:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
