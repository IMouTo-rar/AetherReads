import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userInfo } from "~/cookies.server";

export async function loader({
  params,
  request
}: LoaderFunctionArgs) {
  const id = Number(params.id);
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userInfo.parse(cookieHeader)) || {};
  return {
    "pageUserID": id,
    "pageCookie": cookie.user
  };
}

export default function User() {
  const page = useLoaderData<typeof loader>();
  const user = page.pageCookie;
  return (
    <div>
      User Page
      <hr/>
      User ID: {user.id}
      <br/>
      User Name: {user.username}
      <hr/>
      Phone: {user.phone}
      <br/>
      Email: {user.email}
      <hr/>
      User Info: 
      <ul>
        <li>Name: { user.info.name }</li>
        <li>Birthdate: { user.info.birthdate }</li>
        <li>Address: { user.info.address }</li>
      </ul>
    </div>
  );
}