import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";
import axios from "axios";
import { NumbersContext } from "../Dashboard/Numbers/Numbers";

const clientId = "AeiVai2vHkOMWDKDWn09k6IZyP5BS8tog7WBXXGJdIK3YiFCaO3h3CoNdl6sPv4N50xiiGwxcPxUWSus";

export default function PayPalProcessor({ payment }) {
  let { selectedAvailableNumber } = useContext(NumbersContext);
  PayPalProcessor.propTypes = {
    payment: PropTypes.object.isRequired,
  };

  const onSuccess = (payment) => {
    console.log("Payment Successful", payment);
    axios.post("/api/numbers/purchase/paypal/", { orderId: payment.id, number: selectedAvailableNumber.phoneNumber });
  };

  const onCancel = (data) => {
    console.log("Payment Cancelled", data);
  };

  const onError = (err) => {
    console.log("Error", err);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: payment.amount,
                },
              },
            ],
          });
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: "P-0E62409KX93840XJZL9XZ2J",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: payment.amount,
                },
              },
            ],
          });
        }}

        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onCancel={onCancel}
        onError={onError}
        clientId={clientId}
      />
    </PayPalScriptProvider>
  );
}
