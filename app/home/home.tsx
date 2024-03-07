import type {
  MetaFunction,
  LinksFunction
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "AetherReads" },
    { name: "description", content: "Welcome to AetherReads" },
  ];
};

import styles from "~/home/style/home.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function Index() {
  return (
    <div className="home-frame">
      <div>Dashborad Left</div>
      <div>Main Page</div>
      <div>Dashborad Roght</div>
    </div>
  );
}
