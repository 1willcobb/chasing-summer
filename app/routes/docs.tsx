import { Outlet } from "@remix-run/react";

import Nav from "~/components/Nav";

export default function Docs() {
  return (
    <div className="flex flex-col h-full">
      <Nav />
      <section className="flex flex-grow">
        <Outlet />
      </section>
    </div>
  );
}
