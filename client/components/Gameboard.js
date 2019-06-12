import React from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories.js';

const Gameboard = props => {
  return (
    <div
      data-testid='gameboard'
      id={props.currentQuestion.question ? 'question' : 'gameboard'}
    >
      {props.currentQuestion.question ? (
        props.currentQuestion.question
      ) : (
        <Categories
          categories={props.categories}
          selectQuestion={props.selectQuestion}
          answeredQuestions={props.answeredQuestions}
        />
      )}
      {/* was a question clicked?  */}
      {/* Yes? Show clue */}
      {/* No? Show Categories */}
    </div>
  );
};

Gameboard.propTypes = {
  currentQuestion: PropTypes.object,
  selectQuestion: PropTypes.func,
  categories: PropTypes.array,
  answeredQuestions: PropTypes.array
};

export default Gameboard;
