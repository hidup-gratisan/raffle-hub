import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto">
          <span className="text-background text-4xl font-bold">R</span>
        </div>
        <h1 className="text-4xl font-bold font-mono">404</h1>
        <p className="text-muted-foreground">Page not found</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-2 bg-primary text-primary-foreground font-mono uppercase tracking-wider rounded-lg mt-4 hover:brightness-110 transition-all"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
