import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'SoluGrow - Premier Gym Management Software',
  description: 'Scale your fitness business with SoluGrow. The all-in-one SaaS for gym management, member tracking, and growth automation.',
  openGraph: {
    title: 'SoluGrow - Premier Gym Management Software',
    description: 'Scale your fitness business with SoluGrow.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
