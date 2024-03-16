// This handles logic for animating the route mount and fetching data for a particular page.
import React, { useContext } from "react";
import PropTypes from "prop-types";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";

export default function AnimatedRouteMount({
  children,
  className,
  routeMountRequestInfo,
  transitionKey,
}) {
  let { appContextData, setContextData } = useContext(AppContext);
  let { location } = useHistory();

  AnimatedRouteMount.propTypes = {
    className: PropTypes.string,
    routeMountRequestInfo: PropTypes.any,
    children: PropTypes.node,
    transitionKey: PropTypes.any,
  };

  return (
    <TransitionGroup className={`flex-grow ${className ? className : ""}`}>
      <CSSTransition
        classNames="fade"
        exit={false}
        key={transitionKey ? transitionKey : location.key}
        onEnter={() => {
          setContextData({
            ...appContextData,
            isLoading: true,
          });
        }}
        onEntered={async () => {
          if (routeMountRequestInfo) {
            if (routeMountRequestInfo.requestPath=="")
              return;
            const response = await axios.get(routeMountRequestInfo.requestPath);

            if (routeMountRequestInfo.operation) {
              if (routeMountRequestInfo.operation == "push") {
                setContextData({
                  ...appContextData,
                  isLoading: false,
                  [routeMountRequestInfo.dataObjName]: [
                    ...appContextData[routeMountRequestInfo.dataObjName],
                    ...response.data,
                  ],
                });
              }
            } else {
              setContextData({
                ...appContextData,
                isLoading: false,
                [routeMountRequestInfo.dataObjName]: response.data,
              });
            }
          } else {
            setContextData({
              ...appContextData,
              isLoading: false,
            });
          }
        }}
        timeout={600}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
}
