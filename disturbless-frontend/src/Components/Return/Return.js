import React from "react";
import PropTypes from "prop-types";

export default function Return(props) {
  let { onClick } = props;

  Return.propTypes = {
    onClick: PropTypes.func
  };

  return (
    <div onClick={onClick} className="lg:hidden btn-shadow rounded-5xl btn-shadow bg-btn-gray w-14 h-14 flex justify-center items-center">
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2L2 8L8 14" stroke="#5685FF" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}