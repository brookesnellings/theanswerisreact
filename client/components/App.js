import React, { Component } from 'react';
import { categories } from '../../testdata';
import Gameboard from './Gameboard.js';
import Scoreboard from './Scoreboard';
import Response from './Response.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: categories,
      currentQuestion: {},
      answeredQuestions: [],
      score: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // Getting data from an external API
    //1. A query to /api/categories to get a set of categories
    //2. A set of queries afterwards to /api/category at each category id to get clues for that category
  }

  handleClick(clue) {
    this.setState({ currentQuestion: clue });
  }

  render() {
    const { results, currentQuestion, score } = this.state;
    const response = Object.keys(currentQuestion).length ? (
      <div>
        <Response />
      </div>
    ) : (
      <div />
    );
    return (
      <div id={'app'}>
        <Gameboard
          categories={results}
          currentQuestion={currentQuestion}
          selectQuestion={this.handleClick}
        />
        <Scoreboard score={score} />
        {response}
      </div>
    );
  }
}
