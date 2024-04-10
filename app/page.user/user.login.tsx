import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";
import { UserLogin } from "~/impl/impl.user.server";
import { Form } from "@remix-run/react";

export async function action({
  request,
}: ActionFunctionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const form = await request.formData();
  const username = String(form.get("username"));
  const password = String(form.get("password"));

  const userId = await UserLogin(
    username,
    password
  );

  if (userId == null) {
    session.flash("error", "Invalid username/password");
    // Redirect back to the login page with errors.
    return redirect("/user/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  
  session.set("userId", userId);
  console.log(session.has("userId"));
  console.log(session.get("userId"))
  
  // Login succeeded, send them to the home page.
  return redirect("/personal", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function UserLoginTSX() {
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
        <input type="submit"></input>
      </Form>
    </div>
  );
}
