import React, { useContext, useEffect, useState } from "react";
import { NotificationsContext } from "../Dashboard/Notifications/Notifications";
import NumbersTable from "../NumbersTable/NumbersTable";

import Popup from "../Popup/Popup";
// import { isEmpty } from "../../Utils/isEmpty";
import { CircularProgress } from "@mui/material";
import axios from "axios";

export default function ManageWhiteListPopup() {
  let { manageWhiteListPopupOpen, setManageWhiteListPopupOpen } =
    useContext(NotificationsContext);

  return (
    <Popup
      render={manageWhiteListPopupOpen}
      toggleRender={setManageWhiteListPopupOpen}
      // onEnter={}
    >
      <ManageWhitelistContent />
    </Popup>
  );
}

function ManageWhitelistContent() {
  let [numbers, setNumbers] = useState(undefined);

  useEffect(() => {
    // Request whitelist data here
    axios.get("/api/notifications/whitelist").then((res) => {
      setNumbers(res.data.settings.whitelist);
    });
  }, []);

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <div className="pt-9 px-10 pb-14">
        <h6 className="text-blue text-lg font-sans font-bold">
          Manage whitelist
        </h6>
        {numbers == undefined ? (
          <CircularProgress />
        ) : (
          <NumbersTable initialNumbers={numbers} numbersNature="whitelist" className="mt-8" />
        )}
      </div>
    </div>
  );
}
