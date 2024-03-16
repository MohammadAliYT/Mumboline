import React, { useState, useContext } from "react";
import "./_view1.scss";

import * as Button from "../../Button/Button";
import heroImg from "../../../Assets/UnDraw 1.webp";
import { MainContext } from "../Main";
import { SeeHowItWorksButton } from "./SeeHowItWorksButton";
import { MyDashboardButton } from "./MyDashboardButton";
import { Link } from "react-router-dom";

export default function View1() {
  let [isNavMobileShown, setIsNavMobileShown] = useState(false);
  let { setRenderLogin } = useContext(MainContext);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between my-5">
        <h1 className="text-gray text-2xl font-sans font-bold header__logo">
          MumboLine
        </h1>
        <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon lg:hidden"
          htmlFor="menu-btn"
          onClick={() => setIsNavMobileShown(!isNavMobileShown)}
        >
          <span className="navicon"></span>
        </label>
        <nav className="lg:flex hidden">
          <ul className="flex items-center">
            <li className="text-blue text-2xl font-sans font-medium pr-14">
              <Link to="/">Home</Link>
            </li>
            <li className="text-gray text-2xl font-sans cursor-pointer">
              <Link to="/vote-for-features">Vote for features</Link>
            </li>
          </ul>
        </nav>
        <div className="header__login lg:block hidden lg:justify-self-end cursor-pointer">
          <Button.Grey onClick={() => setRenderLogin(true)}>
            Sign up / Sign in
          </Button.Grey>
        </div>
      </header>
      <nav
        className={`text-center text-gray text-2xl font-sans font-medium transition-height 
          ease-in-out duration-1000 overflow-hidden
      ${isNavMobileShown ? "h-36" : "h-0"}`}
      >
        <ul>
          <li className="text-blue">Home</li>
          <li className="mt-5 cursor-pointer">Vote for features</li>
          <li
            className="mt-5 cursor-pointer"
            onClick={() => setRenderLogin(true)}
          >
            Sign up / Sign in
          </li>
        </ul>
      </nav>
      <section className="flex flex-grow lg:flex-row flex-col-reverse items-center justify-center">
        <div className="xl:w-1/2 lg:4/6">
          <h1 className="text-blue lg:text-5xl text-3xl font-sans font-bold hero__header mt-8 lg:mt-0">
            Receive SMS & Voice Messages to Your Email
          </h1>
          <p className="text-gray text-lg font-sans lg:my-14 my-7">
            With MumboLine you get a private virtual phone number and all SMS &
            Voice messages are forwarded to your Email or primary phone number
            selectively.
          </p>
          <div className="flex flex-col sm:block">
            <SeeHowItWorksButton />
            <MyDashboardButton />
          </div>
        </div>
        <div className="hero__image lg:ml-auto">
          <img src={heroImg} alt="Guy with an envelope illustration" />
        </div>
      </section>
    </div>
  );
}
