import type { LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData} from "@remix-run/react";

import { serverFindBookById } from "~/impl/impl.books.server";

import Previewer from "~/components/previewer";

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
  const fileUrl = "/data/books/" + book.id + "/" + book.file;
  return (
    <div className="book-id-frame">
      <div className="book-id-left">
        <div className="clear">
          <h3>{book.title}</h3>
          <hr />
          <h4>Author: {book.author}</h4>
          <h4>Category: {book.category}</h4>
          <p>{book.publisher + '. ' + book.publication_date}</p>
        </div>

        <TagList />

        <div className="clear">
          <hr />
          <p>{book.description}</p>
          <hr />
          <p>Release: {book.release}</p>
          <p>Format: {book.format.toString().toUpperCase()}</p>
        </div>
      </div>

      <div className="book-id-main">
        <Previewer file={book.format} url={fileUrl}/>
      </div>

      <div className="book-id-right">
        <h3>Chapter</h3>
        <hr />
      </div>
    </div>
  );
}

function TagList() {
  const book = useLoaderData<typeof loader>();
  const tagsArray = Array.from(book.tags).map(item => String(item))
  const tags = tagsArray.map((tag) =>
    <div className="book-id-tag" key={'tag-' + tag}>
      <NavLink to={"/book"}>
        {tag}
      </NavLink>
    </div>
  );

  return (
    <div className="book-id-tags">
      {tags}
      <div className="clear"></div>
    </div>
  )
}
