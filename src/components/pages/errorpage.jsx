import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 text-center md:text-left">
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-6xl font-bold text-blue-700">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600">
          We couldn't find the page you're looking for. It might have been
          removed or moved.
        </p>

        <Link to="/">
          <button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded transition">
            Go to Home
          </button>
        </Link>
      </div>
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <img
          src="/images/error_img.jpg"
          alt="Error illustration"
          className="w-full max-w-sm mx-auto"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
