import React from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue.js';

const Category = props => {
  var clues = props.category.clues.map(clue => {
    return (
      <Clue key={clue.id} clue={clue} selectQuestion={props.selectQuestion} />
    );
  });
  return (
    <div className={'category'} data-testid='category'>
      <div className='categoryTitle'>{props.category.title}</div>
      {clues}
    </div>
  );
};

Category.propTypes = {
  title: PropTypes.string,
  selectQuestion: PropTypes.func,
  currentQuestion: PropTypes.object,
  answeredQuestions: PropTypes.array
};

export default Category;
