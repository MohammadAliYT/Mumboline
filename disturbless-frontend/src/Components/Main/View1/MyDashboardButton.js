import React, { useContext } from "react";
import * as Button from "../../Button/Button";

import axios from "axios";
import { Redirect } from "react-router";
import { MainContext } from "../Main";

export function MyDashboardButton() {
  let { loggedIn, setLoggedIn, setRenderLogin } = useContext(MainContext);

  let myDashboardButtonOnClick = () => {
    axios.get("/api/userdata/").then(() => setLoggedIn(true));

    setRenderLogin(true);
  };

  return (
    <>
      {!loggedIn ? (
        <Button.Grey
          className="myDashboardBtn lg:mb-0 mb-14 sm:mt-0 mt-4"
          onClick={myDashboardButtonOnClick}
        >
          My dashboard
        </Button.Grey>
      ) : (
        <Redirect to="/dashboard/" />
      )}
    </>
  );
}
