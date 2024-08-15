import { Link } from "@remix-run/react";

export default function Nav() {
  return (
    <nav className="flex justify-between absolute p-4 w-full">
      <div className="flex">
        <Link
          to="/"
          className="font-chicle text-orange-500 text-4xl whitespace-nowrap"
        >
          <h1>Chasing Summer</h1>
        </Link>
      </div>
      <div className="items-center flex ">
        <ul className="gap-6 px-6 hidden sm:flex">
          <li className="">
            <Link
              to="/aboutus"
              className="text-orange-500 hover:text-orange-800"
            >
              about
            </Link>
          </li>
          <li>
            <Link to="/blog" className="text-orange-500 hover:text-orange-800">
              blog
            </Link>
          </li>
          <li>
            <Link
              to="/videos"
              className="text-orange-500 hover:text-orange-800"
            >
              videos
            </Link>
          </li>
        </ul>
        <div className="dropdown">
          <div className="drawer">
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
            <div className="drawer-side" >
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="flex flex-col items-center gap-6 bg-orange-50 text-base-content min-h-full w-1/2 p-6 text-4xl font-chicle">
                <li className="">
                  <Link
                    to="/aboutus"
                    className="text-orange-500 hover:text-orange-800"
                  >
                    about
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-orange-500 hover:text-orange-800"
                  >
                    blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/videos"
                    className="text-orange-500 hover:text-orange-800"
                  >
                    videos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="btn px-6 bg-orange-500 hover:bg-orange-400 border-none text-white"
        >
          Join
        </Link>
      </div>
    </nav>
  );
}
