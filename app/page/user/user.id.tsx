import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const id = Number(params.id);
  return id;
}

export default function User() {
  const userId = useLoaderData<typeof loader>();
  return (
    <div>
      User Page
      <br />
      User ID: {userId}
    </div>
  );
}