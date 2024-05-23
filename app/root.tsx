import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";

import styles from "~/style/root.css";
import Banner from "./components/banner";
import bannerStyle from "~/components/style/banner.css";
import Search from "./components/search";
import searchStyle from "./components/style/search.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: bannerStyle },
  { rel: "stylesheet", href: searchStyle }
];

export default function App() {
  const [activeSearch, setActiveSearch] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="total16" />
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0 }}>

        <div className="root-frame">
          <Banner
            isActive={activeSearch}
            toggleActive={() => setActiveSearch(!activeSearch)}
          />
          <Search
            isActive={activeSearch}
            toggleActive={() => setActiveSearch(!activeSearch)}
          />
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
