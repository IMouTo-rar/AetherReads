import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const userInfo = createCookie("user-info", {
  maxAge: 604_800, // one week
});

export const userSess = createCookie("user-sess", {
  maxAge: 604_800,
});