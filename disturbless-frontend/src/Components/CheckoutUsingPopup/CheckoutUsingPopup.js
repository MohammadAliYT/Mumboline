// Checkout using popup code, for when adding numbers

import React, { useContext, useState } from "react";
import Popup from "../Popup/Popup";
import { NumbersContext } from "../Dashboard/Numbers/Numbers";
import { Icon } from "@iconify/react";
import ccPaypal from "@iconify/icons-fa-brands/cc-paypal";
import ccStripe from "@iconify/icons-cib/cc-stripe";
import CryptoIcon from "../../Assets/Crypto.svg";

import PayPalProcessor from "../PayPalProcessor/PayPalProcessor";
import StripeProcessor from "../StripeProcessor/StripeProcessor";

export default function CheckoutUsingPopup() {
  let { renderCheckoutUsingPopup, setRenderCheckoutUsingPopup } =
    useContext(NumbersContext);
  return (
    <Popup
      render={renderCheckoutUsingPopup}
      toggleRender={setRenderCheckoutUsingPopup}
    >
      <CheckoutUsingPopupContent />
    </Popup>
  );
}

function CheckoutUsingPopupContent() {
  let [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PAYPAL"); // PAYPAL | STRIPE | CRYPTO
  return (
    <div className="overflow-y-hidden max-h-popup btn-grey-bg btn-shadow rounded-5xl">
      <div className="pt-9 px-10 pb-48">
        <h6 className="text-blue text-lg font-sans font-bold">
          Checkout using:
        </h6>
        <h6 className="mt-8 ml-4 text-gray font-sans text-sm leading-8">
          Payment Source
        </h6>
        <div className="flex flex-row items-center">
          <Icon
            icon={ccPaypal}
            color="#686868"
            width="128"
            height="113"
            className="mr-12"
            onClick={() => setSelectedPaymentMethod("PAYPAL")}
          />
          <Icon
            icon={ccStripe}
            color="#686868"
            width="127"
            height="127"
            className="mr-12"
            onClick={() => setSelectedPaymentMethod("STRIPE")}
          />
          <img
            src={CryptoIcon}
            alt="Crypto Paiements Processor"
            onClick={() => setSelectedPaymentMethod("CRYPTO")}
          />
        </div>
        {selectedPaymentMethod === "PAYPAL" ? (
          <PayPalProcessor payment={{ amount: 4.99 }} vault={true} />
        ) : selectedPaymentMethod === "STRIPE" ? (
          <StripeProcessor />
        ) : selectedPaymentMethod === "CRYPTO" ? (
          "Crypto Component"
        ) : (
          "Woops, an error has occured, try refreshing the page!"
        )}
        {/* <Button.Orange
          className="mt-32"
          paddingClasses={["py-4", "w-full", "mt-6"]}
          textSizeClass={"text-sm"}
          onClick={() => console.log("Next popup")}
        >
          Next
        </Button.Orange> */}
      </div>
    </div>
  );
}
