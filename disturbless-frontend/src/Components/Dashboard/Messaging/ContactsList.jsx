import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import userAvatarFilled from "@iconify/icons-carbon/user-avatar-filled";
import { MessagingContext } from "./Messaging";
import { AppContext } from "../../../App";

export function ContactsList() {
  let {
    selectedNumber,
    showMessages,
    selectedContact,
    setSelectedContact,
    setShowMessages,
    filteredData,
  } = useContext(MessagingContext);

  let { appContextData, setContextData } = useContext(AppContext);
  let { dashboardMessagingData } = appContextData;
  let { contactsPerNumber } = dashboardMessagingData;

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
      className={`flex mt-8 flex-col h-full justify-between max-h-contacts overflow-auto ${
        showMessages ? "lg:overflow-auto overflow-hidden" : ""
      }`}
    >
      <div>
        {contacts.map((messenger, i) => {
          return (
            <div
              key={i}
              className={`flex items-center py-3 px-2 cursor-pointer borderBottom rounded ${
                messenger.contact === selectedContact.contact
                  ? "bg-gray-300"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                // Removes messages if a click is registered on a new contact
                if (messenger.contact !== selectedContact.contact) {
                  setContextData({
                    ...appContextData,
                    messagesData: [],
                  });
                }
                // Selects the newly clicked on contact
                setSelectedContact(messenger);
                // Shows the messages if on mobile.
                setShowMessages(true);
              }}
            >
              <Icon
                icon={userAvatarFilled}
                color="#686868"
                width="32"
                height="32"
              />
              <div className="pl-2">
                <h6 className="text-sm text-gray font-sans font-bold">
                  {messenger.contact}
                </h6>
                <h6 className="pt-1 text-xs text-gray font-medium font-sans">
                  {messenger.content}
                </h6>
              </div>
            </div>
          );
        })}
      </div>
      {/* <h6 className="font-sans text-center text-gray text-xs mt-2">
        Load more
      </h6> */}
    </div>
  );
}
