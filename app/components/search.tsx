/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { redirect, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean,
  toggleActive: VoidFunction
}

export default function Search({
  isActive,
  toggleActive
}: SearchProps) {

  const [inputValue, setInputValue] = useState("");

  // Dom ref
  const search_bg = useRef<HTMLDivElement>(null);
  const search_pg = useRef<HTMLDivElement>(null);
  const search_input = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Add Listener
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (search_pg.current && !search_pg.current?.contains(event.target)) {
        if (isActive) {
          toggleActive();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isActive, toggleActive]);

  function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (inputValue && event.key == "Enter") {
      if (isActive) {
        toggleActive()
      }
      navigate("/book?keyword=" + inputValue);
      setInputValue("");
    }
  }

  return (
    <div
      className={`search ${isActive ? "" : "hidden"}`}
      ref={search_bg}
    >
      <div
        className="search-page"
        ref={search_pg}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => handleSubmit(event)}
        />

      </div>

    </div>
  );

}