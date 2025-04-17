import type { MetaFunction } from "@remix-run/node";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import AIAgent from "~/components/AIAgent";

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
