import './globals.css';
import NavBar from '@/components/NavBar/NavBar';

export const metadata = {
  title: 'Social Stream',
  description: 'A front-end social media stream built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <NavBar />
        {children}
        </body>
    </html>
  );
}
