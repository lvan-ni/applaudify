import type { Metadata } from 'next';
import NextAuthProviders from '@/utils/nextAuthProviders';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import SessionCheck from '@/components/check/session-check';

const josefin = Josefin_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'applaudify',
  description: 'where achievements get applauded',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={josefin.className}>
        <NextAuthProviders>
          <SessionCheck />
          {children}
        </NextAuthProviders>
      </body>
    </html>
  );
}
