import React from "react";
import { SearchAndContacts } from "./SearchAndContacts";
import { CallsList } from "./CallsList";

export function CallsRectangle() {
  return (
    <div className="flex rounded-3xl btn-shadow btn-grey-bg mt-8 sm:px-8 px-2 py-8 tracking-wide h-messaging">
      <SearchAndContacts />
      <CallsList />
    </div>
  );
}
