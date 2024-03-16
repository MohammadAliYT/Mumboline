import React, { useState, useContext, useEffect } from "react";
import "./_messaging.scss";

import axios from "axios";
import { NoMessages } from "./NoNumbers";
import { MessagingRectangle } from "./MessagingRectangle";
import { MessagingHeader } from "./MessagingHeader";

import { AppContext } from "../../../App";
import { isEmpty } from "../../../Utils/isEmpty";
import moment from "moment";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import { CircularProgress } from "@mui/material";
export const fullConfig = resolveConfig(tailwindConfig);
export const MessagingContext = React.createContext({});

export default function Messaging() {
  const { appContextData, setContextData } = useContext(AppContext);
  const { dashboardMessagingData } = appContextData;

  const [showMessages, setShowMessages] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState({});
  const [selectedNumber, setSelectedNumber] = useState({});
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    if (isEmpty(selectedContact) && !isEmpty(dashboardMessagingData)) {
      const { contactsPerNumber } = dashboardMessagingData;
      setSelectedContact(contactsPerNumber[0]);
    }
  }, [dashboardMessagingData]);

  useEffect(
    function updateEvery15Secs() {
      const interval = setInterval(async () => {
        const lastJsTimestamp = moment().subtract(15, "seconds").unix() * 1000;
        console.log("Refreshing...", lastJsTimestamp);

        const response = await axios.get(
          `/api/messaging/pull/new/${lastJsTimestamp}`
        );

        // Prepares new variables for state change
        const { messagesData } = appContextData;
        const { contactsPerNumber } = dashboardMessagingData;

        const newMessages = [...messagesData];
        const newContacts = [...contactsPerNumber];

        // Appends new messages and contacts to the state
        response.data.newMessages.forEach((contactUpdate) => {
          // find if contact already exists
          const contact = newContacts.find(
            (existingContact) =>
              existingContact.disturblessNumber ===
                contactUpdate.disturblessNumber &&
              existingContact.contact === contactUpdate.contactNumber
          );

          if (!contact) {
            // add contact
            newContacts.push({
              disturblessNumber: contactUpdate.disturblessNumber,
              contact: contactUpdate.contactNumber,
            });
          }

          // Pushing new messages of this contact and removing duplicates
          const existingRecentContactMessages = newMessages.filter(
            (message) =>
              message.contact === contactUpdate.contactNumber &&
              message.number === contactUpdate.disturblessNumber &&
              message.when > lastJsTimestamp
          );

          contactUpdate.newMessages.forEach((message) => {
            if (
              existingRecentContactMessages.find(
                (existingMessage) => existingMessage.content === message.content
              ) === undefined
            ) {
              newMessages.push({
                ...message,
                source: message.direction,
                contact: contactUpdate.contactNumber,
                number: contactUpdate.disturblessNumber,
              });
            }
          });
        });

        // Re renders given the new data.
        setContextData({
          ...appContextData,
          dashboardMessagingData: {
            ...appContextData.dashboardMessagingData,
            contactsPerNumber: newContacts,
          },
          messagesData: newMessages,
        });
      }, 15000);
      return () => clearInterval(interval);
    },
    [selectedContact, selectedNumber, appContextData]
  );

  return (
    <MessagingContext.Provider
      value={{
        filteredData,
        setFilteredData,
        selectedContact,
        setSelectedContact,
        showMessages,
        setShowMessages,
        message,
        setMessage,
        selectedNumber,
        setSelectedNumber,
      }}
    >
      <MessagingPage />
    </MessagingContext.Provider>
  );
}

function MessagingPage() {
  const { appContextData } = useContext(AppContext);
  const { dashboardMessagingData } = appContextData;
  const { numbers } = dashboardMessagingData;

  return (
    <>
      {isEmpty(dashboardMessagingData) ? (
        <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
          <CircularProgress />
        </div>
      ) : numbers?.length ? (
        <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
          <MessagingHeader />
          <MessagingRectangle />
        </div>
      ) : (
        <NoMessages heading={"Inbox"} />
      )}
    </>
  );
}
