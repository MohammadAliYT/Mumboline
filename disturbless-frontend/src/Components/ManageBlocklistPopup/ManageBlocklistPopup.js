// Manage blocklist popup code.

import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { NotificationsContext } from "../Dashboard/Notifications/Notifications";
import NumbersTable from "../NumbersTable/NumbersTable";
import { CircularProgress } from "@mui/material";

import Popup from "../Popup/Popup";

export default function ManageBlockListPopup() {
  let { manageBlocklistPopupOpen, setManageBlocklistPopupOpen } =
    useContext(NotificationsContext);

  return (
    <Popup
      render={manageBlocklistPopupOpen}
      toggleRender={setManageBlocklistPopupOpen}
      // onEnter={}
    >
      <ManageBlockListContent />
    </Popup>
  );
}

function ManageBlockListContent() {
  let [numbers, setNumbers] = useState(undefined);

  useEffect(() => {
    // Request whitelist data here
    axios.get("/api/notifications/blacklist").then((res) => {
      setNumbers(res.data.settings.blacklist);
    });
  }, []);

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <div className="pt-9 px-10 pb-14">
        <h6 className="text-blue text-lg font-sans font-bold">
          Manage blacklist
        </h6>
        {numbers == undefined ? (
          <CircularProgress />
        ) : (
          <NumbersTable initialNumbers={numbers} numbersNature="blacklist" className="mt-8" />
        )}
      </div>
    </div>
  );
}

