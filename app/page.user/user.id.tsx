import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { users } from "database/users";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const id = Number(params.id);
  const foundUser = users.find(obj => obj.id == id);

  if (foundUser == undefined) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return foundUser;
}

export default function Users() {
  const user = useLoaderData<typeof loader>();
  return (
    <div>
      User Page
      <br />
      User ID: {user.id}
      <br />
      User Account: {JSON.stringify(user.account)}
    </div>
  );
}