// This is the progress bar that you see when transitioning from page to page.
import React from "react";
import PropTypes from "prop-types";
import { useNProgress } from "@tanem/react-nprogress";
import Bar from "./Bar";
import Container from "./Container";

export function Progress(props) {
  Progress.propTypes = {
    isAnimating: PropTypes.bool,
  };

  const { isAnimating } = props;
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
}
