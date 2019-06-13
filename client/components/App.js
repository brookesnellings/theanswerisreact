import React, { Component } from 'react';
import { categories } from '../../testdata';
import Gameboard from './Gameboard.js';
import Scoreboard from './Scoreboard';
import Response from './Response.js';
import axios from 'axios';
import { connect } from 'react-redux';
import NewGame from './NewGame.js';
import Timer from './Timer.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: -1,
      selectedPlayer: 0,
      alreadyAnswered: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.recordResponse = this.recordResponse.bind(this);
    this.handleNumberOfPlayers = this.handleNumberOfPlayers.bind(this);
  }
  componentDidMount() {
    console.log(this.props)
    var context = this;
    var categoryList = {};
    axios.get('http://jservice.io/api/categories?count=5')
      .then(function (response) {
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
        context.props.updateResults(arr);

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleNumberOfPlayers(number) {
    this.props.numberOfPlayers(number);
  }

  handleClick(clue) {
    this.setState(() => {
      return { timer: 5 }
    })
    this.props.selectClue(clue);
    var clear = setInterval(() => {
      if (this.state.timer === 0) {
        clearInterval(clear);
        this.props.questionAnswered();
        this.setState({ alreadyAnswered: [] })
      }
      console.log(this.state.timer);
      this.setState((prev) => {
        return { timer: prev.timer - 1 }
      })
    }, 1000);
    this.listenForBuzzes(clear);
  }

  listenForBuzzes(clear) {
    var context = this;
    var players = this.props.fromRedux.numberOfPlayers;
    var keys = ['q', 'f', 'j', 'p'];
    window.addEventListener('keydown', function buzzIn(e) {
      var indexOfPressed = keys.indexOf(e.key)
      console.log(e.key)
      if (keys.includes(e.key) && (players - 1) >= indexOfPressed && !context.state.alreadyAnswered.includes(e.key)) {
        context.state.alreadyAnswered.push(e.key)
        window.removeEventListener('keydown', buzzIn);
        clearInterval(clear);
        context.setState({
          selectedPlayer: indexOfPressed + 1
        })
      }
    })
  }


  recordResponse(e) {
    if (e.key === 'Enter') {
      this.submitResponse(this.props.fromRedux.userResponse);
    } else {
      this.props.recordResponse(e.target.value);
    }
  }

  submitResponse(response) {
    if (response.toLowerCase() === this.props.fromRedux.currentQuestion.answer.toLowerCase()) {
      this.props.correctAnswer(this.state.selectedPlayer);
      this.setState({
        selectedPlayer: 0,
        timer: -1,
        alreadyAnswered: []
      })
      this.props.questionAnswered();
    } else {
      this.props.wrongAnswer(this.state.selectedPlayer);
      this.setState({
        selectedPlayer: 0,
        timer: 5
      })
      var clear = setInterval(() => {
        if (this.state.timer === 0) {
          clearInterval(clear);
          this.props.questionAnswered();
        }
        console.log(this.state.timer);
        this.setState((prev) => {
          return { timer: prev.timer - 1 }
        }
        )
      }, 1000);
      this.listenForBuzzes(clear);
    }
  }

  render() {
    const { results, currentQuestion, score, answeredQuestions } = this.props.fromRedux;
    const response = Object.keys(currentQuestion).length && this.state.selectedPlayer ? (
      <div>
        <Response recordResponse={this.recordResponse} />
      </div>
    ) : (
        <div />
      );

    var displayGame = this.props.fromRedux.numberOfPlayers ? (
      <div id={'app'}>
        <Timer timer={this.state.timer} />
        <Gameboard
          categories={results}
          currentQuestion={currentQuestion}
          selectQuestion={this.handleClick}
          answeredQuestions={answeredQuestions}
        />
        {/* Display SB based on number of players and label them */}
        <Scoreboard score={score} players={this.props.fromRedux.numberOfPlayers} selectedPlayer={this.state.selectedPlayer} />
        {response}
      </div>
    ) : (
        <div>
          <NewGame handleNumberOfPlayers={this.handleNumberOfPlayers} />
        </div>
      )
    return (
      <div>
        {displayGame}
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
    updateResults: (results) => dispatch({ type: 'UPDATE_RESULTS', results }),
    selectClue: (clue) => dispatch({ type: "SELECT_CLUE", clue }),
    recordResponse: (response) => dispatch({ type: "RECORD_RESPONSE", response }),
    correctAnswer: (player) => dispatch({ type: "CORRECT_ANSWER", player }),
    wrongAnswer: (player) => dispatch({ type: "WRONG_ANSWER", player }),
    questionAnswered: () => dispatch({ type: "QUESTION_ANSWERED" }),
    numberOfPlayers: (number) => dispatch({ type: "NUMBER_OF_PLAYERS", number })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)