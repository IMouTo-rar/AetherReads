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

// PDF Style
import previewerStyle from "~/components/style/previewer.css";
import previewerAnnotationLayer from 'react-pdf/dist/Page/AnnotationLayer.css';
import previewerTextLayer from 'react-pdf/dist/Page/TextLayer.css';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: previewerStyle },
  { rel: "stylesheet", href: previewerAnnotationLayer },
  { rel: "stylesheet", href: previewerTextLayer },
];

export default function Index() {
  return (
    <Outlet />
  );
}