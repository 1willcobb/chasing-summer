import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

import cobbfam from "~/images/cobbfam.jpg";
import cobbfam2 from "~/images/cobbfam2.jpg";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Chasing Summer" }];

export default function Index() {
  const user = useOptionalUser();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-white ">
      <div className="absolute h-screen md:inset-0">
        <img
          className="h-full w-full object-cover"
          src={isMobile ? cobbfam : cobbfam2}
          alt="Dunes in Pismo Beach, California"
        />
      </div>
      
      <div className="navbar absolute p-4">
        <div className="navbar-start">
          <Link
            to="/"
            className="font-chicle text-orange-500 text-4xl whitespace-nowrap"
          >
            <h1>Chasing Summer</h1>
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 hidden sm:flex">
            <li>
              <Link to="/" className="text-orange-500 hover:text-orange-800">
                about
              </Link>
            </li>
            <li>
              <Link to="/" className="text-orange-500 hover:text-orange-800">
                blog
              </Link>
            </li>
            <li>
              <Link to="/" className="text-orange-500 hover:text-orange-800">
                videos
              </Link>
            </li>
          </ul>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="text-orange-500 hover:text-orange-800">
                  about
                </Link>
              </li>
              <li>
                <Link to="/" className="text-orange-500 hover:text-orange-800">
                  blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-orange-500 hover:text-orange-800">
                  videos
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn px-6 bg-orange-500 hover:bg-orange-400 border-none text-white">
            Join
          </Link>
        </div>
      </div>
    </main>
  );
}
