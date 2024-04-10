import { NavLink } from "@remix-run/react";

export default function Banner() {
  return (
    <div className="banner-frame">

      <div className="banner-logo">
        Logo
      </div>

      <div className="banner-menu">
        <NavLink to={"/"}>
          Home
        </NavLink>

        <NavLink to={"/book"}>
          Books
        </NavLink>

        <div className="banner-menu-search">
          <input type="text" placeholder="Search" readOnly/>
          <button></button>
        </div>

        <NavLink to={"/personal"}>
          Personal
        </NavLink>

        <NavLink to={"/library"}>
          Library
        </NavLink>

        {/* <div className="banner-search">
          <form>
            <input type="text" placeholder="Search" />
            <button></button>
          </form>
        </div> */}
      </div>

      <div className="banner-acount">
        <NavLink to={"/user"}>
          <img src="/icons/user.png" alt="User Icon"></img>
        </NavLink>
      </div>
    </div>
  );
}