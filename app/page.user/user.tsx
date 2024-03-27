import { redirect } from "@remix-run/node"; // or cloudflare/deno

export const action = async () => {

  return redirect("/1");

};

export default function User() {
  return (
    <div className="user-frame">
      User
    </div>
  );
}