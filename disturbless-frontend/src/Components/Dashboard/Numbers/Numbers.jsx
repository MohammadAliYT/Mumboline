import React, { useContext, useState } from "react";
import * as Button from "../../Button/Button";
import { NumbersTable } from "../../Table/Table";
import CircularProgress from "@mui/material/CircularProgress";
import "./_numbers.scss";
import PageTitle from "../PageTitle/PageTitle";
import { AppContext } from "../../../App";
import { isEmpty } from "../../../Utils/isEmpty";
import { NoNumbers } from "../Messaging/NoNumbers";
import ForwardingPopup from "../../ForwardingPopup/ForwardingPopup";
import CancelNumberSubscriptionPopup from "../../CancelNumberSubscriptionPopup/CancelNumberSubscriptionPopup";
import AddNumberPopup from "../../AddNumberPopup/AddNumberPopup";
import CheckoutUsingPopup from "../../CheckoutUsingPopup/CheckoutUsingPopup";
import { Icon } from "@iconify/react";
import wrenchIcon from "@iconify/icons-iconoir/wrench";
export const NumbersContext = React.createContext();

export default function Numbers() {
  const {
    appContextData: { dashboardNumbersData },
  } = useContext(AppContext);
  const { numbers } = dashboardNumbersData;

  const [forwardingPopupOpen, setForwardingPopupOpen] = useState(false);
  const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
  const [number, setNumber] = useState({});
  const [addNumberPopupOpen, setAddNumberPopupOpen] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [selectedAvailableNumber, setSelectedAvailableNumber] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [renderCheckoutUsingPopup, setRenderCheckoutUsingPopup] =
    useState(false);
  const [subscription, setSubscription] = useState({
    monthly: true,
    yearly: false,
  });
  let [address, setAddress] = useState({
    customerName: "",
    street: "",
    city: "",
    region: "",
    postalCode: "",
  });

  return (
    <NumbersContext.Provider
      value={{
        forwardingPopupOpen,
        cancelPopupOpen,
        number,
        addNumberPopupOpen,
        setForwardingPopupOpen,
        setCancelPopupOpen,
        setNumber,
        setAddNumberPopupOpen,
        countriesList,
        setCountriesList,
        availableNumbers,
        setAvailableNumbers,
        selectedAvailableNumber,
        setSelectedAvailableNumber,
        selectedCountry,
        setSelectedCountry,
        renderCheckoutUsingPopup,
        setRenderCheckoutUsingPopup,
        subscription,
        setSubscription,
        address,
        setAddress,
      }}
    >
      <div className="pt-24 px-16">
        {!isEmpty(dashboardNumbersData) ? (
          !isEmpty(numbers) ? (
            <>
              <div className="flex flex-col sm:flex-row">
                <PageTitle
                  pageTitle={"Numbers"}
                  headingClassname={
                    "lg:ml-0 text-blue text-3xl font-sans font-medium"
                  }
                  containerClassname="flex-grow"
                />
                <Button.Orange
                  className="mx-auto sm:ml-auto mt-2 sm:mt-0"
                  onClick={() => {
                    // Open up the add number popup
                    setAddNumberPopupOpen(true);
                  }}
                >
                  Add Number
                </Button.Orange>
              </div>
              <h6 className="text-gray text-lg font-sans py-4">
                List of rented phone numbers
              </h6>
              <NumbersTable
                tableHeads={["Number", "Country", "Label", "Active", "Actions"]}
                rows={numbers.map((number, i) => [
                  ...getTableContent(number),
                  <div
                    key={i}
                    className="flex item-center text-center justify-center "
                  >
                    <Button.Grey
                      paddingClasses="px-6 py-1"
                      textClasses="btnTextSmall text-gray tracking-wide"
                      onClick={() => {
                        setNumber(number);
                        setForwardingPopupOpen(true);
                      }}
                    >
                      <Icon
                        icon={wrenchIcon}
                        color="#686868"
                        width="20"
                        height="20"
                      />
                    </Button.Grey>

                    <Button.Red
                      disabled={!number.isActive}
                      paddingClasses="px-6 py-2"
                      textClasses="btnTextSmall text-white tracking-wide disabled"
                      onClick={() => {
                        setNumber(number);
                        setCancelPopupOpen(true);
                      }}
                    >
                      {!number.isActive ? "Cancelled" : "Cancel"}
                    </Button.Red>
                  </div>,
                ])}
              />
            </>
          ) : (
            <NoNumbers
              heading={"Numbers"}
              setAddNumberPopupOpen={setAddNumberPopupOpen}
            />
          )
        ) : (
          <CircularProgress />
        )}
      </div>
      <ForwardingPopup />
      <CancelNumberSubscriptionPopup />
      <AddNumberPopup />
      <CheckoutUsingPopup />
    </NumbersContext.Provider>
  );
}

function getTableContent(number) {
  return [
    number.friendlyName,
    number.country,
    number.label,
    number.isActive == true ? "Yes" : "No",
  ];
}
