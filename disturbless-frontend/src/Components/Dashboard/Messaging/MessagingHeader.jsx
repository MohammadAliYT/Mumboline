import React, { useContext } from "react";
import PageTitle from "../PageTitle/PageTitle";
import { NumberSelector } from "./NumberSelector";
import { MessagingContext } from "./Messaging";

export function MessagingHeader() {
  let { showMessages, setShowMessages } = useContext(MessagingContext);

  return (
    <div
      className={`flex w-full sm:flex-row flex-col sm:items-stretch items-center ${
        showMessages ? "" : "flex"
      }`}
    >
      <PageTitle
        pageTitle={"Inbox"}
        headingClassname={"text-blue text-4xl font-sans font-medium ml-4"}
        returnOnClick={() => {
          setShowMessages(false);
        }}
        useAsReturn={showMessages}
      />
      <NumberSelector />
    </div>
  );
}
