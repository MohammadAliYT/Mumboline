/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
// import { SearchAndCompose } from "./SearchAndCompose";
import { ContactsList } from "./ContactsList";
import { CallsContext } from "./Calls";

export function SearchAndContacts() {
  let { setSelectedContact } = useContext(CallsContext);

  return (
    <div className="borderRight p-2">
      {/* <SearchAndCompose setSelectedContact={setSelectedContact} /> */}
      <h1>Contacts</h1>
      <ContactsList />
    </div>
  );
}
