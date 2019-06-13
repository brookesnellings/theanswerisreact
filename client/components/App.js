import React, { Component } from 'react';
import { categories } from '../../testdata';
import Gameboard from './Gameboard.js';
import Scoreboard from './Scoreboard';
import Response from './Response.js';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      currentQuestion: {},
      answeredQuestions: [],
      score: 0,
      userResponse: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.recordResponse = this.recordResponse.bind(this);
  }
  componentDidMount() {
    console.log(this.props)
    var context = this;
    var categoryList = {};
    axios.get('http://jservice.io/api/categories?count=5')
      .then(function (response) {
        // handle success
        let promises = response.data.map(category => {
          categoryList[category.id] = category.title;
          return axios.get(`http://jservice.io/api/clues?category=${category.id}`)
        })
        return axios.all(promises);
      }).then(function (res) {
        var arr = []
        res.map((category, i) => {
          arr[i] = {
            clues: category.data,
            title: category.data[0].category.title,
            id: category.data[0].category.id
          };
        })
        console.log(arr)
        context.setState({
          results: arr
        })
        context.props.updateResults(arr);

      })
      .catch(function (error) {
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
const mapStateToProps = (state) => {
  console.log(state);
  return {
    fromRedux: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateResults: (results) => dispatch({ type: 'UPDATE_RESULTS', results })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)