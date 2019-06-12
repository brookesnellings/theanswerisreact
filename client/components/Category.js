import React from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue.js';

const Category = props => {
  var clues = props.category.clues.map((clue, i) => {
    return (
      <Clue
        key={clue.id}
        clue={clue}
        value={clue.value ? clue.value : ((i + 1) * 200)}
        selectQuestion={props.selectQuestion}
        // Refactor to reduce time complexity from O(n) to O(1) using objects
        answered={props.answeredQuestions.includes(clue.id)}
      />
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
