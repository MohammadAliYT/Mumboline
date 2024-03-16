// Generic implementation of a popup, other popups are composed with this one.
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function Popup({ render, toggleRender, onEnter, onExit, children }) {
  Popup.propTypes = {
    render: PropTypes.bool,
    toggleRender: PropTypes.func,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    children: PropTypes.node,
  };

  return (
    <TransitionGroup component={null}>
      {render && (
        <CSSTransition
          classNames="fade2"
          timeout={400}
          onEnter={onEnter ? onEnter : () => {}}
          onExit={onExit ? onExit : () => {}}
        >
          <div>
            <div
              className="opacity-60 bg-gray-100 h-screen w-screen fixed inset-0"
              onClick={() => {
                toggleRender(false);
              }}
            ></div>
            <div className="fixed lg:w-5/12 sm:w-9/12 w-full transform -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4">
              {children}
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}
