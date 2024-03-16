import React, { useContext } from "react";
import moment from "moment";

import sendAlt from "@iconify-icons/carbon/send-alt";
import { Icon } from "@iconify/react";
import { InputNP } from "../../Input/Input";
import { MessagingContext, fullConfig } from "./Messaging";
import { Messages } from "./Messages";
import AnimatedRouteMount from "../../AnimatedRouteMount/AnimatedRouteMount";
import { AppContext } from "../../../App";
import { isEmpty } from "../../../Utils/isEmpty";

import axios from "axios";

export function MessagesAndComposeMessage() {
  let {
    setSelectedContact,
    selectedContact,
    message,
    setMessage,
    selectedNumber,
  } = useContext(MessagingContext);

  let { appContextData, setContextData } = useContext(AppContext);
  let { messagesData } = appContextData;

  let onInputEnterPress = (e) => {
    if (e.key == "Enter") {
      addMessage();
    }
  };

  let addMessage = async () => {
    axios.post("/api/messaging/sendsms/", {
      From: selectedNumber.number,
      To: selectedContact.contact,
      Body: message,
      SmsStatus: "sent",
    });

    let newMessage = {
      source: "sent",
      content: message,
      when: moment.now(),
      To: selectedContact.contact,
      From: selectedNumber.number,
    };

    let newState = {
      ...appContextData,
      messagesData: [...messagesData, newMessage],
    };

    if (contactDoesntExist(appContextData, selectedContact)) {
      addNewContact(newMessage, appContextData, newState);
    } else {
      modifyExistingContact(newState, selectedContact, selectedNumber, message);
    }

    setContextData(newState);
    setMessage("");
  };

  return (
    <div className="pl-4 w-full h-full">
      <h6 className="text-gray text-lg font-sans">
        Conversation with:
        <input
          className="outline-none bg-transparent"
          value={isEmpty(selectedContact) ? "none" : selectedContact.contact}
          onChange={(e) => {
            setSelectedContact({
              contact: e.target.value,
            });
          }}
        />
      </h6>
      <AnimatedRouteMount
        transitionKey={
          isEmpty(selectedContact) ? "messagesKey" : selectedContact.contact
        }
        className="h-5/6"
        routeMountRequestInfo={{
          requestPath: isEmpty(selectedContact)
            ? ""
            : "/api/messaging/" +
              `${selectedNumber.number}/` +
              selectedContact.contact,
          dataObjName: "messagesData",
        }}
      >
        <Messages />
      </AnimatedRouteMount>
      <InputNP
        placeholder={"Type a message..."}
        className="pr-10"
        value={message}
        setValue={setMessage}
        onKeyDown={onInputEnterPress}
        InputIcon={
          <Icon
            icon={sendAlt}
            color={fullConfig.theme.colors.blue.DEFAULT}
            width={18}
            height={18}
            className="absolute top-2 left-full -ml-20 cursor-pointer"
            onClick={addMessage}
          />
        }
      />
    </div>
  );
}

function modifyExistingContact(
  newState,
  selectedContact,
  selectedNumber,
  message
) {
  let existingContact = newState.dashboardMessagingData.contactsPerNumber.find(
    (contact) =>
      contact.contact == selectedContact.contact &&
      contact.disturblessNumber == selectedNumber.number
  );

  existingContact.content = message;
}

function addNewContact(newMessage, appContextData, newState) {
  let newContactsPerNumber = [
    {
      disturblessNumber: newMessage.number,
      contact: newMessage.contact,
      content: newMessage.content,
      direction: newMessage.sender,
      nature: "SMS",
      when: Date(newMessage.when),
    },
    ...appContextData.dashboardMessagingData.contactsPerNumber,
  ];

  let numbers = newState.dashboardMessagingData.numbers;
  newState.dashboardMessagingData = {
    contactsPerNumber: newContactsPerNumber,
    numbers,
  };
}

function contactDoesntExist(appContextData, selectedContact) {
  return (
    appContextData.messagesData.find(
      (message) => message.contact == selectedContact.contact
    ) == undefined ||
    appContextData.dashboardMessagingData.contactsPerNumber.find(
      (contact) => contact.contact == selectedContact.contact
    ) == undefined
  );
}
