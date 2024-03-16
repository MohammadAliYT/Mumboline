// This is the home page, each review resembles an element that takes up the height of the screen.
/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import View1 from "./View1/View1";
import View2 from "./View2/View2";
import View3 from "./View3/View3";
import View4 from "./View4/View4";
import View5 from "./View5/View5";
import View6 from "./View6/View6";
import Footer from "../Footer/Footer";

import LoginPopup from "../LoginPopup/LoginPopup";
import SignupPopup from "../SignupPopup/SignupPopup";
import ForgotPasswordPopUpOpen from "../ForgotPasswordPopup/ForgotPassword";

export const MainContext = React.createContext({
  renderLogin: false,
  setRenderLogin: () => {},
  renderSignup: false,
  setRenderSignup: () => {},
  forgotPassword: false,
  setForgotPassword: () => {},
  loggedIn: false,
});

export function Main() {
  const [renderLogin, setRenderLogin] = useState(false);
  const [renderSignup, setRenderSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);
  return (
    <MainContext.Provider
      value={{
        renderLogin,
        setRenderLogin,
        renderSignup,
        setRenderSignup,
        loggedIn,
        setLoggedIn,
        forgotPasswordPopup,
        setForgotPasswordPopup,
      }}
    >
      <div className="view max-w-mac mx-auto">
        <View1 />
        <View2 />
        <View3 />
        <View4 />
        <View5 />
        <View6 />
      </div>
      <Footer />
      <LoginPopup />
      <SignupPopup />
      <ForgotPasswordPopUpOpen />
    </MainContext.Provider>
  );
}
