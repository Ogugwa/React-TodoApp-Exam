import { SiTodoist } from "react-icons/si";
import { useState } from "react";
import { NavLink } from "react-router";

function Default() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col">
      <nav className="flex p-1 justify-center items-center gap-4 shadow-md">
        <SiTodoist className="h-20 w-10 iconColor" />
        <h1 className="text-2xl font-bold text-gray-800 md:flex-1">
          Deborah Okolo App
        </h1>
      </nav>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center p-6">
        <h2 className="font-bold text-xl md:text-3xl text-center mb-4">
          Your tasks. Your notes. One smooth workspace.
        </h2>
        <p className="text-gray-600 text-center max-w-md">
          No clutter, no chaos.{" "}
          <span className="font-bold text-blue-500">Deborah's App</span> helps
          you stay on top of your thoughts and to-dos, without breaking your
          flow.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white px-4 py-2 rounded w-[10rem] hover:bg-blue-600"
                : "bg-lightblue text-black border-2 px-4 py-2 rounded w-[10rem] hover:bg-blue-500"
            }
          >
            <button className="text-center">Log In</button>
          </NavLink>
          <NavLink to="/signup">
            <button
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded w-[10rem]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: isHovered ? "white" : "lightblue",
                color: isHovered ? "black" : "white",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </NavLink>
        </div>
      </section>
      {/* Image content */}
      <section className="mt-8">
        <img
          src="/images/hero_img.webp"
          alt="Hero"
          className="w-full max-w-6xl mx-auto h-auto rounded-lg shadow-lg"
        />
      </section>
    </div>
  );
}

export default Default;
