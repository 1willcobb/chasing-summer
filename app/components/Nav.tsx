import { Link } from "@remix-run/react";
import logo from "~/images/chasingsummer_logos_handdrawn_R3-03.png";

export default function Nav() {
  return (
    <nav className="flex justify-between absolute p-4 w-full ">
      <div className="flex">
        <Link to="/" className="footer-title text-4xl whitespace-nowrap">
          AI AGENT
        </Link>
      </div>
      <div className="items-center flex ">
        <ul className="gap-6 px-6 hidden sm:flex">
          <li className="">
            <Link to="/aboutus" className="footer-title">
              about
            </Link>
          </li>
          <li>
            <Link to="/blog" className="footer-title ">
              blog
            </Link>
          </li>
          <li>
            <Link to="/videos" className="footer-title ">
              videos
            </Link>
          </li>
        </ul>
        <div className="dropdown">
          <div className="drawer z-50">
            <input
              id="my-drawer-4"
              type="checkbox"
              className="drawer-toggle "
            />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="btn btn-ghost sm:hidden">
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
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="flex flex-col items-center gap-6 bg-base-200 text-base-content min-h-full w-1/2 p-6 text-4xl">
                <li className="text-left">
                  <Link to="/aboutus" className="footer-title ">ABOUT</Link>
                </li>
                <li>
                  <Link to="/blog" className="footer-title ">BLOG</Link>
                </li>
                <li>
                  <Link to="/videos" className="footer-title ">VIDEOS</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Link to="/" className=" btn px-6 border-none bg-alert text-white">
          SIGN UP
        </Link>
      </div>
    </nav>
  );
}
