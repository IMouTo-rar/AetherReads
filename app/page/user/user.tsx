import type {
  LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { userInfo } from "~/cookies.server";

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userInfo.parse(cookieHeader)) || {};
  const user = cookie.user;
  // 已登录
  if (user != null) {
    return redirect("/user/" + user.id, {
      headers: {
        "Set-Cookie": await userInfo.serialize(cookie),
      },
    });
  }
  //未登录
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
