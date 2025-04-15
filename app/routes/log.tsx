import { Outlet } from "@remix-run/react";
import Nav from "~/components/Nav";

export default function Log() {
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
