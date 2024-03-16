/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import "./_calls.scss";

import axios from "axios";
import { NoNumbers } from "./NoNumbers";
import { CallsRectangle } from "./CallsRectangle";
import { CallsHeader } from "./CallsHeader";

import { AppContext } from "../../../App";
import { isEmpty } from "../../../Utils/isEmpty";
import moment from "moment";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import { CircularProgress } from "@mui/material";
export const fullConfig = resolveConfig(tailwindConfig);
export const CallsContext = React.createContext({});

export default function Calls() {
  const { appContextData, setContextData } = useContext(AppContext);
  const { dashboardCallsData } = appContextData;

  const [showCalls, setShowCalls] = useState(false);
  const [call, setCall] = useState("");
  const [selectedContact, setSelectedContact] = useState({});
  const [selectedNumber, setSelectedNumber] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [voicemailPopup, setVoicemailPopup] = useState(false);

  useEffect(() => {
    if (isEmpty(selectedContact) && !isEmpty(dashboardCallsData)) {
      let { contactsPerNumber } = dashboardCallsData;

      setSelectedContact(contactsPerNumber[0]?.calls[0]);
    }
  }, [dashboardCallsData]);

  return (
    <CallsContext.Provider
      value={{
        filteredData,
        setFilteredData,
        selectedContact,
        setSelectedContact,
        showCalls,
        setShowCalls,
        call,
        setCall,
        selectedNumber,
        setSelectedNumber,
        voicemailPopup,
        setVoicemailPopup,
      }}
    >
      <CallsPage />
    </CallsContext.Provider>
  );
}

function CallsPage() {
  const { appContextData } = useContext(AppContext);
  const { dashboardCallsData } = appContextData;
  const { numbers } = dashboardCallsData;

  return (
    <>
      {isEmpty(dashboardCallsData) ? (
        <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
          <CircularProgress />
        </div>
      ) : numbers ? (
        <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
          <CallsHeader />
          <CallsRectangle />
        </div>
      ) : (
        <NoNumbers heading={"Calls"} />
      )}
    </>
  );
}
