'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Inter } from 'next/font/google';
import './../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
