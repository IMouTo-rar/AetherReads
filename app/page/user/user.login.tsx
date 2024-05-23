import { 
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

import { UserLogin } from "~/impl/impl.users.server";
import { userInfo } from "~/cookies.server";

export async function action({
  request,
}: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userInfo.parse(cookieHeader)) || {};


  const formData = await request.formData();
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));
  const user = await UserLogin(username, password);

  if (user == null) {
    console.log("Log in failed:\nInvalid username or password.");
    return redirect('/user/login?error=invalid');
  }
  else {
    cookie.user = user;
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await userInfo.serialize(cookie),
    },
  });
}

export async function loader({
  request,
}: LoaderFunctionArgs) {
  // parse the search params for `?error=`
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  return error;
}
export default function UserLoginTSX() {
  const error = useLoaderData<typeof loader>();
  return (
    <div>
      <Form method="POST">
        <div>
          <p>Please sign in</p>
        </div>
        <label>
          Username: <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:{" "}
          <input type="password" name="password" />
        </label>
        <br />
        <input type="submit"/>
      </Form>
      {error == null ? "" : <p>Invalid username or password.</p>}
    </div>
  );
}
