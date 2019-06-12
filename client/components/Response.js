import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Response(props) {
  return (
    <div id='response' data-testid='response'>
      <input
        onKeyUp={e => {
          props.recordResponse(e);
        }}
        type='text'
        placeholder='Answers go here!'
      // handle data change
      // handle when 'enter' is hit
      />
    </div>
  );
}

Response.propTypes = {
  recordResponse: PropTypes.func,
  submitResponse: PropTypes.func
};
