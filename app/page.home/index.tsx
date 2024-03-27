import type {
  MetaFunction,
  LinksFunction
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "AetherReads | Home" },
    { name: "description", content: "Welcome to AetherReads" },
  ];
};

import styles from "~/page.home/style/home.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function Index() {
  return (
    <div className="frame home-frame">
      

      <div>Main Page</div>

    </div>
  );
}
