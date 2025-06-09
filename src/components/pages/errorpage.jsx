import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>We couldn't find the page you're looking for.</p>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Go to Home
          </button>
        </Link>
      </div>
      <div>
        <img
          src="/images/error_img.jpg"
          alt="Error illustration"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
