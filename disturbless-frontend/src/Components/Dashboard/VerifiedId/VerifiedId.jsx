// Popup code for the when clicking on add number
/* eslint-disable no-unused-vars */

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../App";
import { VerifiedHeader } from "./VerifiedHeader";
import { VerifyTable } from "../../Table/Table";
import AddVerifyIdPopup from "./AddVerifyIdPopup";
import RemoveVerifyPopup from "./RemoveVerifyPopup";

export default function VerifiedId() {
  const {
    appContextData: { dashboardVerifiedId },
  } = useContext(AppContext);

  const [emails, setEmails] = useState(dashboardVerifiedId.emails);
  const [numbers, setNumbers] = useState(dashboardVerifiedId.numbers);
  const [addVerifyPopup, setAddVerifyPopup] = useState(false);
  const [removeVerifyPopup, setRemoveVerifyPopup] = useState(false);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setEmails(dashboardVerifiedId.emails);
    setNumbers(dashboardVerifiedId.numbers);
  }, [dashboardVerifiedId]);

  return (
    <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
      <VerifiedHeader />

      <h6 className="text-gray text-lg font-sans py-4">
        List of verified phone numbers and emails
      </h6>
      <div className="flex flex-col gap-8">
        <VerifyTable
          title="Verified Numbers"
          tableHeads={["Number", "Action"]}
          rows={numbers}
          popup={addVerifyPopup}
          setPopup={setAddVerifyPopup}
          setRemoveButton={setRemoveVerifyPopup}
          type="number"
          setType={setType}
          setSelected={setSelected}
        />
        <VerifyTable
          title="Verified Emails"
          tableHeads={["Email", "Action"]}
          rows={emails}
          popup={addVerifyPopup}
          setPopup={setAddVerifyPopup}
          setRemoveButton={setRemoveVerifyPopup}
          type="email"
          setType={setType}
          setSelected={setSelected}
        />
      </div>
      <AddVerifyIdPopup
        popup={addVerifyPopup}
        setPopup={setAddVerifyPopup}
        type={type}
      />
      <RemoveVerifyPopup
        popup={removeVerifyPopup}
        setPopup={setRemoveVerifyPopup}
        type={type}
        selected={selected}
      />
    </div>
  );
}
