// An element that collapses and expands when clicked.

import React from "react";
import { Collapse } from "react-collapse";

import PropTypes from "prop-types";

import "./_collapsible.scss";

class Collapsible extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpened: false, height: 80, title: props.title, paragraph: props.paragraph };

    Collapsible.propTypes = {
      title: PropTypes.string,
      paragraph: PropTypes.string,
      className: PropTypes.string
    };

    this.openOrClose = this.openOrClose.bind(this);
  }

  openOrClose() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const { isOpened, height } = this.state;

    return (
      <div style={{ minHeight: height }}
        className={`${this.props.className} btn-grey-bg btn-shadow rounded-2.5xl px-10 py-7`}
      >
        <div className='flex items-center justify-between'
          onClick={this.openOrClose}
          id='title'
        >
          <h3 className="text-blue text-1.75base font-sans">
            {this.state.title}
          </h3>
          {/* Arrow pointing to the right */}
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            className={`transition ease-in-out duration-500 ${isOpened ? "transform rotate-90" : ""}`} >
            <path d="M2.23914 2.23926L11.7609 10.2393L2.23914 18.2393" stroke="#686868" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </div>

        <Collapse isOpened={isOpened}>
          <p className='text-lg text-gray font-sans pt-5'>{this.state.paragraph}</p>
        </Collapse>
      </div>
    );
  }
}

export default Collapsible;