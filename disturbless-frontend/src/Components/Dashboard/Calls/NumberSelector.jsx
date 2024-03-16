/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { CallsContext } from "./Calls";

import { Dropdown } from "../../Input/Input";

export function NumberSelector() {
  return (
    <div className="flex items-center sm:ml-auto sm:mr-0 mx-auto mt-3 sm:mt-0">
      <h6 className="text-gray text-lg font-sans pr-5">Using</h6>
      <Dropdown hook={useSelectedContact} />
    </div>
  );
}

export function useSelectedContact() {
  let { appContextData } = useContext(AppContext);
  let { setSelectedNumber, setSelectedContact } = useContext(CallsContext);
  let { dashboardCallsData } = appContextData;
  let { numbers, contactsPerNumber } = dashboardCallsData;

  const [number, setNumber] = useState(numbers[0]);

  useEffect(() => {
    setSelectedNumber(number);
    const contactsOfSelectedNumber = contactsPerNumber.filter(
      (contact) => contact.disturblessNumber == number
    );
    if (contactsOfSelectedNumber.length > 0)
      setSelectedContact(contactsOfSelectedNumber[0]);
    else setSelectedContact({});
  }, [number]);

  return {
    selected: number,
    setSelected: setNumber,
    dataObj: { numbers },
    elementDisplayFieldKey: "number",
    dataArrKey: "numbers",
  };
}
