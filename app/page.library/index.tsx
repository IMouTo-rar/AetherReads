import type {
    MetaFunction,
    LinksFunction
  } from "@remix-run/node";
  
  export const meta: MetaFunction = () => {
    return [
      { title: "AetherReads | Library" },
      { name: "description", content: "Library" },
    ];
  };
  
  import styles from "~/page.library/style/library.css";
  export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
  ];
  
  export default function Index() {
    return (
      <div className="library-frame frame">
        <div>Library Page</div>
      </div>
    );
  }