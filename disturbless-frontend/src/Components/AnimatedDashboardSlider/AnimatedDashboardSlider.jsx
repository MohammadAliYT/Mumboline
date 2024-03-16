// Code for the animated dashboard slider, found in the dashboard home page.
import React, { useState } from "react";

import PropTypes from "prop-types";

// Example structure:
// hints [ {icon: Component, hint: "lipsum..."}, {icon: Component, hint: "lipsum..."}, ... ]  

export default function AnimatedDashboardSlider(props) {
  let { hints } = props;

  AnimatedDashboardSlider.propTypes = {
    hints: PropTypes.array,
  };

  let [selectedIndex, setSelectedIndex] = useState(0);

  //   const incrementIndex = () => {
  //     if (selectedIndex == testimonials.length - 1)
  //       setSelectedIndex(0);
  //     else
  //       setSelectedIndex(selectedIndex + 1);
  //   };

  //   const decrementIndex = () => {
  //     if (selectedIndex == 0)
  //       setSelectedIndex(testimonials.length - 1);
  //     else
  //       setSelectedIndex(selectedIndex - 1);
  //   };

  const isAtSelectedIndex = (i) => i == selectedIndex;
  const displayItem = (display) => (display ? "opacity-100" : "opacity-0");

  return (
    <div className="flex justify-between items-center btn-grey-bg btn-shadow rounded-5xl max-w-dashboardtip">
      <div className="flex flex-col items-center">
        <div className="relative">
          {hints.map(({hint, icon}, i) => {
            return (
              <div
                key={i}
                className={`flex flex-col pl-10 pt-10 transition ease-in-out duration-500
								${i > 0 ? "absolute top-0" : "block"} 
								${isAtSelectedIndex(i) ? displayItem(true) : displayItem(false)}`}
              >
                <div className="btn-grey-bg btn-shadow rounded-3xl mb-6 self-start p-4">
                  {icon}
                </div>
                <p className="text-gray text-sm font-sans leading-loose tracking-wide max-w-dashboardtip-p">
                  {hint}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex mt-11 pb-5">
          {
            <Dots
              isAtSelectedIndex={isAtSelectedIndex}
              setSelectedIndex={setSelectedIndex}
              testimonials={hints}
            />
          }
        </div>
      </div>
    </div>
  );
}

function Dots({ testimonials, setSelectedIndex, isAtSelectedIndex }) {
  Dots.propTypes = {
    testimonials: PropTypes.array,
    setSelectedIndex: PropTypes.func,
    isAtSelectedIndex: PropTypes.func,
  };

  let dots = [];

  for (let i = 0; i < testimonials.length; i++)
    dots.push(
      <div
        key={i}
        className={`${isAtSelectedIndex(i) ? "bg-blue" : "bg-gray-dotBg"} 
        transition ease-in-out duration-500
        rounded-full w-3 h-3 mx-2`}
        onClick={() => setSelectedIndex(i)}
      ></div>
    );

  return dots;
}
