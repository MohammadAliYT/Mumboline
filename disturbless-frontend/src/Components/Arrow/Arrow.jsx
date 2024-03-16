// An Arrow icon
import React from "react";
import  PropTypes from "prop-types";

export default function Arrow(props) {
  let { className, useSmallArrow } = props;

  Arrow.propTypes = {
    className: PropTypes.string,
    useSmallArrow: PropTypes.bool
  };

  return (
    <svg viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${useSmallArrow ? "" : "lg:w-3.5 lg:h-5"}w-2 h-3`}>
      <path d="M2.23914 2.23926L11.7609 10.2393L2.23914 18.2393" stroke="#686868" strokeWidth="2.6" strokeLinecap="round"/>
    </svg>
  );
}