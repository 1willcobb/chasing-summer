import { createRequestHandler } from "@remix-run/architect";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV !== "production") {
  require("./mocks");
}

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext(event) {
    // Add this to fix the hydration issue
    const url = new URL(event.requestContext.http.path, "http://localhost");
    if (event.rawQueryString) {
      url.search = `?${event.rawQueryString}`;
    }
    
    return {
      // Make the request URL available to loaders
      requestUrl: url.toString()
    };
  },
});