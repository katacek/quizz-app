import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import PropTypes from 'prop-types';

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.node,
};
