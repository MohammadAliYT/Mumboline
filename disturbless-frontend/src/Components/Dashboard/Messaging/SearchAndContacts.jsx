import React from "react";
import { ContactsList } from "./ContactsList";
// import { SearchAndCompose } from "./SearchAndCompose";
// import { MessagingContext } from "./Messaging";

export function SearchAndContacts() {
  // const { setSelectedContact } = useContext(MessagingContext);

  return (
    <div className="borderRight p-2">
      <h6 className="text-blue text-lg font-sans font-bold">Contacts</h6>
      {/* <SearchAndCompose setSelectedContact={setSelectedContact} /> */}
      <ContactsList />
    </div>
  );
}
