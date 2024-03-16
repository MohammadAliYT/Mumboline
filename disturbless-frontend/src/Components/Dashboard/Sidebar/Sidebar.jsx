import React, { useContext } from "react";

import { Link, useHistory } from "react-router-dom";
import { Icon } from "@iconify/react";

import "./_sidebar.scss";
import { DashboardContext } from "./../DashboardRoutes";
import BurgerButton from "./../BurgerButton/BurgerButton";
import { getSidebarLinks } from "../../../DataGrabber";

export default function Sidebar() {
  let { location } = useHistory();
  let links = getSidebarLinks();
  let { navIsOpen } = useContext(DashboardContext);

  return (
    <div
      className={`sidebarFlexBasis btn-grey-bg btn-shadow rounded-5xl flex flex-col items-center 
    transition-height transition-width ease-in-out duration-1000 h-0 w-full lg:h-auto lg:w-auto 
    lg:transition-none absolute z-10 lg:static
    ${navIsOpen ? "h-full" : "h-0"}`}
    >
      <div>
        <div className="flex items-center pt-24">
          <h2 className="text-gray text-2xl font-sans font-bold mr-4">
            MumboLine
          </h2>
          <BurgerButton />
        </div>
        {links.map((link, i) => (
          <Link key={i} to={link.path} className="flex mt-8">
            <Icon
              icon={link.icon}
              width={32}
              height={32}
              color={`${
                link.path == location.pathname ? "#5685FF" : "#686868"
              }`}
            />
            <div
              className={`text-2xl pl-4 font-sans ${
                link.path == location.pathname
                  ? "font-medium text-blue"
                  : "font-regular text-gray"
              }`}
            >
              {link.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
