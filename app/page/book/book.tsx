/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { Form, NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";

import {
  serverFindAllBooks,
  serverFindBookById,
  serverFindBooksByKeyword,
  serverFindBooksByTags,
  serverFindBooks,
} from "~/impl/impl.books.server";

export async function action({
  request
}: ActionFunctionArgs) {

}

export async function loader({
  request
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const keyword = url.searchParams.get("keyword");
  const tags = url.searchParams.getAll("tags");

  const book = await serverFindBooks(tags, keyword, parseInt(page || "1"));
  const booklist = book?.booklist || [];
  const bookcnt = book?.bookcnt || 0;
  return {
    "booklist": booklist,
    "bookcnt": bookcnt,
    "page": page,
    "keyword": keyword,
    "tags": tags,
  };
}

export default function Books() {
  const loaderArgs = useLoaderData<typeof loader>();
  const booklist = loaderArgs?.booklist || [];
  const bookcnt = loaderArgs?.bookcnt || 0;
  const listItems = booklist.map(book =>
    <div className="book-frame-book" key={book.id}>
      <NavLink to={"/book/" + book.id}>
        Book:
        <span> {book.title} </span>
      </NavLink>
    </div>
  );

  const navigate = useNavigate();

  const total_page = Math.ceil(bookcnt / 12);
  const current_page = loaderArgs?.page || 1;
  const current_keyword = loaderArgs?.keyword || "";
  const current_tags = loaderArgs?.tags || [];

  const [page, setPage] = useState(current_page);
  const [keyword, setKeyword] = useState(current_keyword);
  const [tags, setTags] = useState(current_tags);

  return (
    <div className="book-frame">
      <div className="book-frame-left">
        <div className="book-frame-pannel filter">

          <input
            name="keyword"
            type="text"
            placeholder="Keyword"
          />
          <input
            name="tags"
            type="text"
            placeholder="Tags" />


        </div>
        <div className="book-frame-pannel page">

          <input className="invisable" name="keyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} />

          <input
            name="page"
            type="text"
            value={page}
            onChange={(event) => setPage(event.target.value)}

          /> of {total_page} pages.
        </div>
      </div>
      <div className="book-frame-mid">
        {listItems}
      </div>
      <div className="book-frame-right"></div>
    </div>
  );
}
