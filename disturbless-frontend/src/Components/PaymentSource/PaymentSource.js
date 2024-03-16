import React from "react";
import PropTypes from "prop-types";
import "./_paymentSource.scss";

import moment from "moment";

export default function PaymentSource(props) {
  let { paymentImg, userFullName, dateAdded, className } = props; // can add paymentId

  PaymentSource.propTypes = {
    paymentImg: PropTypes.node,
    userFullName: PropTypes.string,
    dateAdded: PropTypes.number,
    paymentId: PropTypes.string,
    className: PropTypes.string
  };

  return (
    <div className={`${className} btn-shadow paymentSourceFlexBasis rounded-5xl pt-8 p-10 mb-14`}>
      <div className="flex justify-between items-center">
        {paymentImg}
        <h6 className="font-sans text-blue text-lg font-medium">Remove</h6>
      </div>
      <h6 className="font-sans text-gray text-lg mt-12">{userFullName}</h6>
      <h6 className="font-sans text-gray text-lg mt-4">
        Added on {displayDate(dateAdded)}
      </h6>
    </div>
  );
}

function displayDate(dateInUnix) {
  let unixTimeStampInMillis = dateInUnix * 1000;

  return moment(unixTimeStampInMillis).format("DD-MM-YYYY");
}
