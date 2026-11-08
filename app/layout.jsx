import { Poppins } from "next/font/google";
import "./globals.css";
import Particles from "../components/Particles";
import MouseGlow from "../components/MouseGlow";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import ChatWidget from "../components/ChatWidget";

// Poppins font (Google Fonts) with system fallback — loaded once for all pages
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Rana Nadeem | Full-Stack Web Developer",
  description:
    "Rana Nadeem — aspiring full-stack web developer (MERN + Next.js) from Lahore, Pakistan. Portfolio, projects, skills and contact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-[#070d1f] text-[#e8eefc] antialiased">
        {/* Starfield + mouse sparkle trail canvas (z-0, content is z-10 above it) */}
        <Particles />
        <div className="relative z-10">
          {/* Soft blue glow following the mouse (above canvas, below content) */}
          <MouseGlow />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
