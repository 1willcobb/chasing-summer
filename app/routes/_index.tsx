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
import AIAgent from "~/components/AIAgent";

export const meta: MetaFunction = () => [{ title: "AI Agent Demo" }];

export default function Index() {
  // const user = useOptionalUser();



  return (
    <main className="  flex flex-col min-h-screen">
      <Nav />
      {/* <AIAgent /> */}
      <Footer />
    </main>
  );
}
