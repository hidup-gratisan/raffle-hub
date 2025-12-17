import { Link, useLocation } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";
import CreateListingModal from "./CreateListingModal";

const Navbar = () => {
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const navLinks = [
    { name: "EXPLORE", path: "/" },
    { name: "ACTIVITY", path: "/activity" },
    { name: "DOCS", path: "/docs" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-background font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-lg tracking-tight">RAFLUX</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    location.pathname === link.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => setShowCreateModal(true)}
                className="text-sm font-bold tracking-wide text-primary hover:text-primary/80 transition-colors"
              >
                CREATE LISTING
              </button>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-xl hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search on Raflux"
                className="w-full h-9 pl-10 pr-4 rounded-lg input-dark text-sm"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <button className="p-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm">−</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
              <span className="font-mono text-sm">0.00</span>
              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[8px] text-background font-bold">$</span>
              </div>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <span className="font-mono text-sm">0xf39F ... 2266</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </nav>

      <CreateListingModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </>
  );
};

export default Navbar;
