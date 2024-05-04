import type {
    MetaFunction,
    LinksFunction
  } from "@remix-run/node";
  
  export const meta: MetaFunction = () => {
    return [
      { title: "AetherReads | Personal" },
      { name: "description", content: "Personal Home Page" },
    ];
  };
  
  import styles from "~/page/personal/style/personal.css";
  export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
  ];
  
  export default function Index() {
    return (
      <div className="frame personal-frame">
        <div>Personal Home Page</div>
      </div>
    );
  }