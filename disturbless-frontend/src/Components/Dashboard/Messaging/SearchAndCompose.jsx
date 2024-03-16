/* eslint-disable no-unused-vars */

import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify/icons-akar-icons/search";
import bxMessageAdd from "@iconify/icons-bx/bx-message-add";
import Input from "../../Input/Input";
import { MessagingContext, fullConfig } from "./Messaging";
import { AppContext } from "../../../App";
//+12525167570
export function SearchAndCompose(props) {
  let { className } = props;
  let { selectedNumber, setSelectedContact, setFilteredData, selectedContact } =
    useContext(MessagingContext);
  let { appContextData } = useContext(AppContext);
  let { dashboardMessagingData } = appContextData;
  let { contactsPerNumber } = dashboardMessagingData;
  const [inputValue, setInputValue] = useState("");

  SearchAndCompose.propTypes = {
    setSelectedContact: PropTypes.func,
    className: PropTypes.string,
  };

  let onContactNumberInput = (contactNumber) => {
    setInputValue(contactNumber);
    if (contactNumber == "") {
      setFilteredData({});
    } else {
      setFilteredData(
        contactsPerNumber.filter(
          (contact) =>
            contact.contact.includes(contactNumber) &&
            contact.disturblessNumber == selectedNumber.number
        )
      );
    }
  };

  return (
    <div className={`flex items-center ${className ? className : ""}`}>
      {/* Search and compose message row */}
      <Input
        placeholder={"Search..."}
        className="pr-10 flex-grow"
        setValue={onContactNumberInput}
        InputIcon={
          <Icon
            icon={searchIcon}
            color={fullConfig.theme.colors.gray.DEFAULT}
            width={18}
            height={18}
            className="absolute top-4 left-6"
          />
        }
      />
      <Icon
        icon={bxMessageAdd}
        onClick={() => {
          setSelectedContact({ contact: inputValue, messages: [] });
        }}
        color="#5685ff"
        width="28"
        height="28"
        className="cursor-pointer"
      />
    </div>
  );
}
