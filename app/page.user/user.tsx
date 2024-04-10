import type {
  LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { getSession } from "../sessions";
import { useLoaderData } from "@remix-run/react";

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  console.log(session.has("userId"));
  if (session.has("userId")) {
    // Redirect to the personal page if they are already signed in.
    return redirect("/personal");
  }
  else {
    return redirect("/user/login");
  }
}

export async function action() {
  
}

export default function Users() {
  const useInfo = useLoaderData<typeof loader>();
  return (
    <div className="user-frame">
      { JSON.stringify(useInfo) }
    </div>
  );
}
