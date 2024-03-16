// Card used in the home page

import React from "react";
import "../Button/_button.scss";

import PropTypes from "prop-types";

export default function Card(props) {
  const { cardContent, className } = props;

  Card.propTypes = {
    cardContent: PropTypes.node,
    className: PropTypes.string
  };

  return (
    <div className={`btn-grey-bg btn-shadow rounded-5xl px-8 py-8 max-w-sm ${className}`}>
      {cardContent}
    </div>
  );
}