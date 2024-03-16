// Buttons and their variants
import React from "react";
import PropTypes from "prop-types";

import "./_button.scss";

export function Orange(props) {
  let { children, textSizeClass, paddingClasses, className, disabled } = props;

  Orange.propTypes = {
    children: PropTypes.node,
    textSizeClass: PropTypes.string,
    paddingClasses: PropTypes.array,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };

  const getTextSizeClass = () => (textSizeClass ? textSizeClass : "text-2xl");
  const getPaddingClasses = () =>
    paddingClasses
      ? paddingClasses.reduce((prev, curr) => curr + " " + prev)
      : "py-6 px-7";

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`rounded-5xl btn-shadow bg-orange text-white tracking-wide
    ${getTextSizeClass()} ${getPaddingClasses()} ${
        className ? className : ""
      } ${disabled ? "opacity-50 cursor-default" : ""}`}
    >
      {children}
    </button>
  );
}

export function Grey(props) {
  let { paddingClasses, textClasses, className, onClick, disabled } = props;

  Grey.propTypes = {
    children: PropTypes.node,
    paddingClasses: PropTypes.string,
    textClasses: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };

  return (
    <button
      onClick={onClick}
      disabled={props.disabled}
      className={`${className ? className : ""} ${
        disabled ? "opacity-50 cursor-default" : ""
      }
    ${textClasses ? textClasses : "text-2xl text-blue tracking-wide"} 
    ${paddingClasses ? paddingClasses : "py-6 px-7"} 
    rounded-5xl btn-shadow btn-grey-bg font-sans`}
    >
      {props.children}
    </button>
  );
}

export function Red(props) {
  let { paddingClasses, textClasses, className, disabled } = props;

  Red.propTypes = {
    children: PropTypes.node,
    paddingClasses: PropTypes.string,
    textClasses: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${className ? className : ""} ${
        disabled ? "opacity-50 cursor-default" : ""
      }
    ${textClasses ? textClasses : "text-2xl text-white tracking-wide"} 
    ${paddingClasses ? paddingClasses : "py-6 px-7"} 
    rounded-5xl btn-shadow bg-red font-sans`}
    >
      {props.children}
    </button>
  );
}

export function Green(props) {
  let { paddingClasses, textClasses, className } = props;

  Green.propTypes = {
    children: PropTypes.node,
    paddingClasses: PropTypes.string,
    textClasses: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  return (
    <button
      onClick={props.onClick}
      className={`${className ? className : ""}
    ${textClasses ? textClasses : "text-2xl text-white tracking-wide"} 
    ${paddingClasses ? paddingClasses : "py-6 px-7"} 
    rounded-5xl btn-shadow bg-green font-sans`}
    >
      {props.children}
    </button>
  );
}
