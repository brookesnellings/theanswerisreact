import React from 'react';
import PropTypes from 'prop-types';

const Clue = props => {
  // show $ value of clue OR
  // the Clue question itself OR
  // empty screen if it was already answered
  const clue = props.answered ? (
    <div className='clueValue' />
  ) : (
      <div onClick={() => props.selectQuestion(props.clue)} className='clueValue'>
        {props.value}
      </div>
    );
  return clue;
};

Clue.propTypes = {
  selected: PropTypes.bool,
  selectQuestion: PropTypes.func,
  answered: PropTypes.bool,
  clueObject: PropTypes.object
};

export default Clue;
