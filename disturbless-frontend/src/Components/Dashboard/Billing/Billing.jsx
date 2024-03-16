import { CircularProgress } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { isEmpty } from "../../../Utils/isEmpty";
import CancelSubscriptionPopup from "../../CancelSubscriptionPopup/CancelSubscriptionPopup";
import ReactivateSubscriptionPopup from "../../ReactivateSubscriptionPopup/ReactivateSubscriptionPopup";

// import PaymentSource from "../../PaymentSource/PaymentSource";
// import { Icon } from "@iconify/react";
// import ccPaypal from "@iconify/icons-fa-brands/cc-paypal";
// import ccStripe from "@iconify/icons-cib/cc-stripe";
// import AddPaymentSource from "../../AddPaymentSource/AddPaymentSource";

import Subscription from "../../Subscription/Subscription";
import PageTitle from "../PageTitle/PageTitle";

export let BillingContext = createContext({
  renderCancelPopup: false,
  setRenderCancelPopup: () => {},
  renderReactivatePopup: false,
  setRenderReactivatePopup: () => {},
  forNumber: {},
  setForNumber: () => {},
});

export default function Billing() {
  let { appContextData } = useContext(AppContext);
  let { dashboardBillingData } = appContextData;

  let [renderCancelPopup, setRenderCancelPopup] = useState(false);
  let [forNumber, setForNumber] = useState({});
  let [renderReactivatePopup, setRenderReactivatePopup] = useState(false);

  return (
    <BillingContext.Provider
      value={{
        renderCancelPopup,
        setRenderCancelPopup,
        renderReactivatePopup,
        setRenderReactivatePopup,
        forNumber,
        setForNumber,
      }}
    >
      <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
        <PageTitle
          pageTitle={"Billing"}
          headingClassname={"lg:ml-0 text-blue text-3xl font-sans font-medium"}
        />
        <h6 className="text-gray text-lg font-sans mt-8">
          Manage your subscriptions from here
        </h6>
        {/* <h2 className="text-blue text-2xl font-sans font-medium mt-14">
        Payment sources
      </h2>
      <div className="mt-8 flex justify-between flex-wrap max-w-paymentmethods">
        <PaymentSource
          userFullName={"John Doe"}
          dateAdded={1628205333}
          paymentImg={<Icon icon={ccPaypal} color="#686868" width="76" height="68" />}
        />
        <PaymentSource
          userFullName={"John Doe"}
          dateAdded={1628205333}
          paymentImg={<Icon icon={ccStripe} color="#686868" width="76" height="68" />}
        />
        <AddPaymentSource />
      </div> */}
        <h2 className="text-blue text-2xl font-sans font-medium mt-16 mb-8">
          Subscriptions
        </h2>
        <div className="flex flex-col gap-8 mb-8">
          {isEmpty(dashboardBillingData) ? (
            <CircularProgress />
          ) : dashboardBillingData.activeNumberSubscriptions.length === 0 ? (
            <h6 className="text-gray text-lg font-sans">
              No active subscriptions
            </h6>
          ) : (
            dashboardBillingData.activeNumberSubscriptions.map(
              (subscription, index) => {
                return <Subscription key={index} number={subscription} />;
              }
            )
          )}
        </div>
      </div>
      <CancelSubscriptionPopup />
      <ReactivateSubscriptionPopup />
    </BillingContext.Provider>
  );
}
