// Checkbox, used for example in the Signin/Signup sections.

import React from "react";
import PropTypes from "prop-types";

import "./Checkbox.scss";

export default function Checkbox(props) {
  let {checkboxName, labelText, className, setValue } = props;

  const onChange = (e) => setValue(e.target.value);

  Checkbox.propTypes = {
    labelText: PropTypes.string,
    checkboxName: PropTypes.string,
    className: PropTypes.string,
    setValue: PropTypes.func
  };

  return (
    <div className={`flex ${className ? className : ""} items-center`}>
      <input type="checkbox" className={"checkbox"} name={checkboxName} onChange={onChange}/>
      <label htmlFor={checkboxName}
        className={"ml-3 text-gray text-sm font-sans"}
      >
        {labelText}
      </label>
    </div>
  );
}