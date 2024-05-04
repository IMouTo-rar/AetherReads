/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      // $home
      route("/", "page/home/index.tsx", {index: true});
      // book
      route("/book", "page/book/index.tsx", () => {
        route("", "page/book/book.tsx", {index: true});
        route(":id", "page/book/book.id.tsx");
      });
      // personal
      route("/personal", "page/personal/index.tsx", ({index: true}))
      // library
      route("/library", "page/library/index.tsx", ({index: true}))
      // user
      route("/user", "page/user/index.tsx", () => {
        route("", "page/user/user.tsx", {index: true});
        route("login", "page/user/user.login.tsx");
        route(":id", "page/user/user.id.tsx");
      });
    }
    );
  },
};
