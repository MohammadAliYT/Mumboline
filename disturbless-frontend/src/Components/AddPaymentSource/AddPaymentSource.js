// The add payment source card
import React from "react";
import PropTypes from "prop-types";

import { Icon } from "@iconify/react";
import circlePlusFill from "@iconify/icons-akar-icons/circle-plus-fill";

export default function AddPaymentSource(props) {
  let { className } = props;

  AddPaymentSource.propTypes = {
    className: PropTypes.string,
  };

  return (
    <div className={`${className} flex justify-between items-center btn-shadow paymentSourceFlexBasis rounded-5xl pt-8 p-10 mb-14 h-60`}>
      <div className="flex items-center">
        <h6 className="font-sans font-bold text-blue text-lg mr-2">
          Add a new payment source 
        </h6>
        <Icon icon={circlePlusFill} color="#5685FF" width="18" height="18" />
      </div>
    </div>
  );
}