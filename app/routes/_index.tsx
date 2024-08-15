import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import Nav from "~/components/Nav";

import cobbfam from "~/images/cobbfam.jpg";
import cobbfam2 from "~/images/cobbfam2.jpg";

import { useOptionalUser } from "~/utils";
import HeroTextLeft from "~/components/HeroTextLeft";
import Footer from "~/components/Footer";
import HeroAndImage from "~/components/HeroAndImage";
import HeroTextRight from "~/components/HeroTextRight";

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
    <main className=" bg-white flex flex-col ">
      <Nav />
      <img
        className="h-full "
        src={isMobile ? cobbfam : cobbfam2}
        alt="Dunes in Pismo Beach, California"
      />
      <HeroAndImage />
      <HeroTextLeft />
      <HeroTextRight />
      <Footer />
    </main>
  );
}
