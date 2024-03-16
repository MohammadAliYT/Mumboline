// This is used for the transitions animation

import React from "react";
import PropTypes from "prop-types";

function Container(props) {
  const { animationDuration, children, isFinished } = props;

  Container.propTypes = {
    animationDuration: PropTypes.number,
    isFinished: PropTypes.bool,
    children: PropTypes.any
  };

  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: "none",
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>);
}

export default Container;
