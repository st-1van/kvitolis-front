import './../sass/main.scss';
import type { Metadata } from "next";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { Montserrat } from 'next/font/google'
import { ScrollLockProvider } from './_components/context/scroll-lock-context';
import { ModalProvider } from './_components/context/modal-context';



const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat' 
})

export const metadata: Metadata = {
  title: "Квітоліс",
  description: "рекреаційний парк",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk-UA" className={`${montserrat.variable}`}>
      <head>
        <link rel="preload" href="/fonts/NAMU/NAMU-Pro.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/NAMU/NAMU-1400.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>
        <ScrollLockProvider>
          <ModalProvider>
            <Header/>
              {children}
            <Footer/>
          </ModalProvider>
        </ScrollLockProvider>
      </body>
    </html>
  );
}
