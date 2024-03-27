import type {
  MetaFunction,
  LinksFunction
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "AetherReads | User" },
    { name: "description", content: "AetherReads Users" },
  ];
};

import styles from "~/page.user/style/user.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function Index() {
  return (
    <div className="frame user-frame">
      <Outlet />
    </div>
  );
}
