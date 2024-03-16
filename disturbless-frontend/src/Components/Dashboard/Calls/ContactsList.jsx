/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import userAvatarFilled from "@iconify/icons-carbon/user-avatar-filled";
import { CallsContext } from "./Calls";
import { AppContext } from "../../../App";

export function ContactsList() {
  let {
    selectedNumber,
    showCalls,
    selectedContact,
    setSelectedContact,
    setShowCalls,
    filteredData,
  } = useContext(CallsContext);

  let { appContextData, setContextData } = useContext(AppContext);
  let { dashboardCallsData } = appContextData;
  let { contactsPerNumber } = dashboardCallsData;

  let [contacts, setContacts] = useState(contactsPerNumber);

  useEffect(() => {
    if (Object.keys(filteredData).length > 0 && filteredData != []) {
      setContacts(filteredData);
    } else {
      setContacts(
        contactsPerNumber.filter(
          (contact) => contact.disturblessNumber == selectedNumber.number
        )
      );
    }
  }, [filteredData, contactsPerNumber, selectedNumber]);

  return (
    <div
      className={"flex mt-8 flex-col h-full justify-between max-h-contacts overflow-y-scroll"}
    >
      <div>
        {contacts.length && contacts[0].calls.map((messenger, i) => {
          return (
            <div
              key={i}
              className={`flex items-center py-3 px-2 cursor-pointer borderBottom rounded ${
                messenger === selectedContact
                  ? "bg-gray-300"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                // Removes calls if a click is registered on a new contact
                if (messenger !== selectedContact) {
                  setContextData({
                    ...appContextData,
                    callsData: [],
                  });
                }
                // Selects the newly clicked on contact
                setSelectedContact(messenger);
                // Shows the messages if on mobile.
                setShowCalls(true);
              }}
            >
              <Icon
                icon={userAvatarFilled}
                color="#686868"
                width="32"
                height="32"
              />
              <div className="pl-5">
                <h6 className="text-sm text-gray font-sans font-bold">
                  {messenger}
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
