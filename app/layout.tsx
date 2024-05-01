import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ConfettiProvider } from '@/components/confetti-provider';
const inter = Inter({ subsets: ['latin'] });
import { Analytics } from '@vercel/analytics/react';
export const metadata: Metadata = {
  title: 'Beast List',
  description: 'Simple todo app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConfettiProvider>
            {children}
            <Analytics />
            <Toaster />
          </ConfettiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
