import type {
    MetaFunction,
    LinksFunction
} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "AetherReads" },
        { name: "description", content: "AetherReads Books" },
    ];
};

import styles from "~/books/style/books.css";
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
];

export default function Index() {
    return (
        <div className="books-frame">
            Books
        </div>
    );
}