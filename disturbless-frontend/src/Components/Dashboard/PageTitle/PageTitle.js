import React from "react";
import PropTypes from "prop-types";
import BurgerButton from "../BurgerButton/BurgerButton";
import Return from "../../Return/Return";

export default function PageTitle(props) {
  let { pageTitle, headingClassname, containerClassname, returnOnClick, useAsReturn } = props;

  PageTitle.propTypes = {
    pageTitle: PropTypes.string,
    headingClassname: PropTypes.string,
    containerClassname: PropTypes.string,
    returnOnClick: PropTypes.func,
    useAsReturn: PropTypes.bool
  };

  return (
    <div className={`flex items-center ${containerClassname ? containerClassname : ""}`}>
      {
        !useAsReturn ? <BurgerButton /> : <Return onClick={returnOnClick}/> 
      }
      <h4 className={`mx-auto ${headingClassname ? headingClassname : "text-blue text-2xl font-sans font-medium"}`}>
        {pageTitle}
      </h4>
    </div>
  );
}