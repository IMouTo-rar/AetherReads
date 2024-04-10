import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { serverFindBookById } from "~/impl/impl.book.server";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const id = Number(params.id);
  const foundBook = await serverFindBookById(id);
  
  if (foundBook == undefined || null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return foundBook;
}

export default function Book() {
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
      <br/>
      Book JSON: { JSON.stringify(book) }
    </div>
  );
}