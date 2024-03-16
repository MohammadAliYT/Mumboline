import React, { useContext } from "react";
import { DashboardContext } from "../DashboardRoutes"; 

export default function BurgerButton() {
  let { navIsOpen, setNavIsOpen } = useContext(DashboardContext);

  return (
    <>
      <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        className="menu-icon lg:hidden"
        htmlFor="menu-btn"
        onClick={() => setNavIsOpen(!navIsOpen)}
      >
        <span className="navicon"></span>
      </label>
    </>
  );
}