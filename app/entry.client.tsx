/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser, useLocation } from "@remix-run/react";
import { startTransition,  useEffect, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

function RemixBrowserWithHydrationFix() {
  // This forces React to wait for the initial URL to be available
  const location = useLocation();

  useEffect(() => {
    // This effect only runs once after the initial render
    window.__INITIAL_URL__ = location.pathname + location.search;
  }, []);

  return <RemixBrowser />;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowserWithHydrationFix />
    </StrictMode>
  );
});