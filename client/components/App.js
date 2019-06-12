import React, { Component } from 'react';
import { categories } from '../../testdata';
import Gameboard from './Gameboard.js';
import Scoreboard from './Scoreboard';
import Response from './Response.js';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: categories,
      currentQuestion: {},
      answeredQuestions: [],
      score: 0,
      userResponse: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.recordResponse = this.recordResponse.bind(this);
  }
  componentDidMount() {
    // Getting data from an external API
    //1. A query to /api/categories to get a set of categories
    //2. A set of queries afterwards to /api/category at each category id to get clues for that category
    axios.get('http://jservice.io/api/categories?count=5')
      .then(function (response) {
        // handle success
        console.log(response);
        let promises = response.data.map(category => {
          return axios.get(`http://jservice.io/api/clues?category=${category.id}`)
        })
        return Promise.all(promises);
      }).then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  handleClick(clue) {
    this.setState({ currentQuestion: clue });
  }

  recordResponse(e) {
    if (e.key === 'Enter') {
      this.submitResponse(this.state.userResponse);
    } else {
      this.setState({
        userResponse: e.target.value
      });
    }
  }

  submitResponse(response) {
    if (response.toLowerCase() === this.state.currentQuestion.answer.toLowerCase()) {
      this.setState(state => {
        return {
          score: state.score + state.currentQuestion.value
        };
      });
    } else {
      this.setState(state => {
        return {
          score: state.score - state.currentQuestion.value
        };
      });

    }
    this.setState(state => {
      return {
        currentQuestion: {},
        answeredQuestions: [
          ...state.answeredQuestions,
          state.currentQuestion.id
        ]
      };
    });
    // this function should fire when the user fills the response and hits 'enter'
    // Is the user response correct?
    // yes/no? What should happen?
  }

  render() {
    const { results, currentQuestion, score, answeredQuestions } = this.state;
    const response = Object.keys(currentQuestion).length ? (
      <div>
        <Response recordResponse={this.recordResponse} />
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
          answeredQuestions={answeredQuestions}
        />
        <Scoreboard score={score} />
        {response}
      </div>

    );
  }
}
