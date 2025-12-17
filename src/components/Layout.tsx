import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LiveTicker from "./LiveTicker";

interface LayoutProps {
  children: ReactNode;
  showTicker?: boolean;
}

const Layout = ({ children, showTicker = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showTicker && <LiveTicker />}
      <Navbar />
      <main className="flex-1 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
