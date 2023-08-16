import React, { useState } from "react";
import { navlinks } from "../constants";

const NavBar = () => {
  const [active, setActive] = useState("Home");

  return (
    <nav className="w-full flex py-3 justify-between items-center navbar">
      <ul className="list-none sm:flex hidden justify-around items-center flex-1">
        {navlinks.map((nav, index) => (
          <li
            className={`text-textcolor text-[20px] cursor-pointer`}
            key={nav.id}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
