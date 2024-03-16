import React from "react";
import { SearchAndContacts } from "./SearchAndContacts";
import { MessagesAndComposeMessage } from "./MessagesAndComposeMessage";

export function MessagingRectangle() {
  return (
    <div className="flex rounded-3xl btn-shadow btn-grey-bg mt-8 sm:px-8 px-2 py-8 tracking-wide h-messaging">
      <SearchAndContacts />
      <MessagesAndComposeMessage />
    </div>
  );
}
