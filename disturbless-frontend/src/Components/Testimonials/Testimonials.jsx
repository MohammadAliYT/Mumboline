import React, { useState } from "react";
import Arrow from "../Arrow/Arrow";

import PropTypes from "prop-types";

export default function Testimonials(props) {
  let { testimonials, className } = props;

  Testimonials.propTypes = {
    testimonials: PropTypes.array,
    className: PropTypes.string
  };

  let [selectedIndex, setSelectedIndex] = useState(0);

  const incrementIndex = () => {
    if (selectedIndex == testimonials.length - 1)
      setSelectedIndex(0);
    else
      setSelectedIndex(selectedIndex + 1);
  };

  const decrementIndex = () => {
    if (selectedIndex == 0)
      setSelectedIndex(testimonials.length - 1);
    else
      setSelectedIndex(selectedIndex - 1);
  };

  const isAtSelectedIndex = (i) => i == selectedIndex;
  const displayItem = display => display ? "opacity-100" : "opacity-0";

  return (
    <div className={`${className} mx-auto flex justify-between items-center max-w-7xl`}>
      <ArrowLeft onClick={decrementIndex} />
      <div className='flex flex-col items-center'>
        <div className='relative overflow-hidden'>
          {testimonials.map(({ testimonial, by, occupation }, i) => {
            return (
              <div key={i}
                className={`flex flex-col items-center transition ease-in-out duration-500
								${i > 0 ? "absolute top-0" : "block"} 
								${isAtSelectedIndex(i) ? displayItem(true) : displayItem(false)}`}
                style={{ backgroundColor: "#F0F1F2" }}
              >
                <p className='max-w-3xl text-gray lg:leading-relaxed lg:text-4xl text-lg font-sans text-justify  tracking-wide'>
                  {testimonial}
                </p>
                <h5 className='text-gray text-2xl font-sans tracking-wide pt-12'>
                  {by}
                </h5>
                <h6 className='text-gray text-lg font-sans tracking-wide'>
                  {occupation}
                </h6>
              </div>
            );
          })
          }
        </div>
        <div className='flex mt-10'>
          {<Dots isAtSelectedIndex={isAtSelectedIndex}
            setSelectedIndex={setSelectedIndex}
            testimonials={testimonials} />}
        </div>
      </div>
      <ArrowRight onClick={incrementIndex} />
    </div>
  );
}

export function ArrowLeft(props) {
  let { SmallCircle, onClick } = props;
  ArrowLeft.propTypes = {
    SmallCircle: PropTypes.bool,
    onClick: PropTypes.func
  };
  return (
    <div onClick={onClick} className={`btn-grey-bg btn-shadow rounded-full ${SmallCircle ? "" : "h-20 lg:w-20"} w-10 h-10 flex items-center justify-center flex-shrink-0 cursor-pointer mr-4`}>
      <Arrow className='transform rotate-180' />
    </div>
  );
}

export function ArrowRight(props) {
  let { SmallCircle, onClick } = props;

  ArrowRight.propTypes = {
    SmallCircle: PropTypes.bool,
    onClick: PropTypes.func
  };

  return (
    <div onClick={onClick} className={`btn-grey-bg btn-shadow rounded-full ${SmallCircle ? "" : "h-20 lg:w-20"} w-10 h-10 flex items-center justify-center flex-shrink-0 cursor-pointer ml-4`}>
      <Arrow />
    </div>
  );
}

export function NumberCell(props) {
  let { SmallCircles, number, onClick } = props;
  NumberCell.propTypes = {
    number: PropTypes.number,
    SmallCircles: PropTypes.bool,
    onClick: PropTypes.func
  };
  return (
    <div onClick={onClick} className={`btn-grey-bg btn-shadow rounded-full ${SmallCircles ? "" : "h-20 lg:w-20"} w-10 h-10 flex items-center justify-center flex-shrink-0 cursor-pointer mx-4`}>
      <div className="text-lg font-sans font-bold text-gray">
        {number}
      </div>
    </div>
  );
}

function Dots({ testimonials, setSelectedIndex, isAtSelectedIndex }) {
  Dots.propTypes = {
    testimonials: PropTypes.array,
    setSelectedIndex: PropTypes.func,
    isAtSelectedIndex: PropTypes.func
  };

  let dots = [];

  for (let i = 0; i < testimonials.length; i++)
    dots.push(
      <div
        key={i}
        className={`${isAtSelectedIndex(i) ? "bg-orange" : "bg-gray-dotBg"} 
        transition ease-in-out duration-500
        rounded-full w-4 h-4 mx-2`}
        onClick={() => setSelectedIndex(i)}
      ></div>
    );

  return dots;
}

