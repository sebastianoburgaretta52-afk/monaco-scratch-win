import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('public/images/notFound.png')] bg-cover bg-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <p className="mb-4 text-2xl font-bold text-gray-900">
          Oops! Non c'è nessun aereo in partenza qui...
        </p>
        <a
          href="/"
          className="text-[#023c4a] text-xl font-extrabold underline hover:text-blue-700"
        >
          Torna alla home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
