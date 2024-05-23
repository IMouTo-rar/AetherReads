import { NavLink } from "@remix-run/react";

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean,
  toggleActive: VoidFunction
}

export default function Banner({
  isActive,
  toggleActive
}:BannerProps) {
  function clickSearch() {
    if (!isActive) {
      toggleActive()
    }
  }

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
          <input type="text" placeholder="Search" onClick={() => clickSearch()} readOnly/>
          <div className="icon"></div>
        </div>

        <NavLink to={"/personal"}>
          Personal
        </NavLink>

        <NavLink to={"/library"}>
          Library
        </NavLink>
        
      </div>

      <div className="banner-acount">
        <NavLink to={"/user"}>
          <img src="/icons/user.png" alt="User Icon"></img>
        </NavLink>
      </div>
    </div>
  );
}