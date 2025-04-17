import type { MetaFunction } from "@remix-run/node";

import AIAgent from "~/components/AIAgent";
import Footer from "~/components/Footer";
import Nav from "~/components/Nav";

export const meta: MetaFunction = () => [{ title: "AI Agent Demo" }];

export default function Index() {
  // const user = useOptionalUser();



  return (
    <main className="  flex flex-col min-h-screen ">
      <Nav />
      <AIAgent />
      <Footer />
    </main>
  );
}
