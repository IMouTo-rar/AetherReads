import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { NavLink, useLoaderData } from "@remix-run/react";

import { findAllBooks } from "~/services/database.books.server";

export async function action() {
  return redirect(`/book/1`);
}

export async function loader() {
  const booklist = await findAllBooks();
  return booklist;
}

export default function Books() {
  return (
    <div className="book-frame frame">
      Book List
      <br />
      <BookList />
    </div>
  );
}

function BookList() {
  const booklist = useLoaderData<typeof loader>();
  const listItems = booklist.map(book =>
    <div key={book.id}>
      Book:
      <NavLink to={"/book/" + book.id}>
        {book.title}
      </NavLink>
    </div>
  );
  return (
    <div>
      {listItems}
    </div>
  );
}