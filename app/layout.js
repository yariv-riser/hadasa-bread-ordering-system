import Header from '@/components/main-header';
import Footer from '@/components/footer';

import "./globals.css";

export const metadata = {
  title: "הזמנת לחם - לחם הדסה",
  description: "לחם מחמצת בעבודת יד שנאפה באהבה במושב עמיקם"
};

export const viewport = {
  themeColor: "#886642"
};

export default function RootLayout({ children }) {
  return (
    <html lang="he">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
