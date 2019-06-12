import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

const Categories = props => {
  var categories = props.categories.map(category => {
    return (
      <Category
        key={category.id}
        category={category}
        selectQuestion={props.selectQuestion}
      />
    );
  });
  return (
    <div id={'categories'} data-testid='categoryList'>
      {categories}
      {/* display all the categories */}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
  selectQuestion: PropTypes.func,
  currentQuestion: PropTypes.object,
  answeredQuestions: PropTypes.array
};

export default Categories;
