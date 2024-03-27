import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { books } from "database/books";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const id = Number(params.id);
  const foundBook = books.find(obj => obj.id == id);

  if (foundBook == undefined) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return foundBook;
}

export default function Books() {
  const book = useLoaderData<typeof loader>();
  return (
    <div>
      Book Found!
      <br/>
      Book ID: { book.id }
      <br/>
      Book Title: { book.title }
      <br/>
      Book Description: { book.description }
    </div>
  );
}