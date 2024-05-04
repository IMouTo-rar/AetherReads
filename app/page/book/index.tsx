import type {
  MetaFunction,
  LinksFunction
} from "@remix-run/node";
import {
  Outlet
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "AetherReads | Books" },
    { name: "description", content: "AetherReads Books" },
  ];
};

import styles from "~/page/book/style/book.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function Index() {
  return (
    <Outlet />
  );
}