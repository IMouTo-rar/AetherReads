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

import bookStyles from "~/page/book/style/book.css";
import bookIdStyles from "~/page/book/style/book.id.css";

// PDF Style
import previewerStyle from "~/components/style/previewer.css";
import previewerAnnotationLayer from 'react-pdf/dist/Page/AnnotationLayer.css';
import previewerTextLayer from 'react-pdf/dist/Page/TextLayer.css';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: bookStyles },
  { rel: "stylesheet", href: bookIdStyles },
  { rel: "stylesheet", href: previewerStyle },
  { rel: "stylesheet", href: previewerAnnotationLayer },
  { rel: "stylesheet", href: previewerTextLayer },
];

export default function Index() {
  return (
    <Outlet />
  );
}