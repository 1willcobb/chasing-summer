import Nav from "~/components/Nav";
import { Outlet } from "@remix-run/react";

export default function Docs() {
  return (
    <div
      className="flex flex-col h-full"
    >
      <Nav />
      <section className="flex flex-grow">
        <Outlet />
      </section>
    </div>
  );
}