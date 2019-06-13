import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/styles.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initState = {
    results: [],
    currentQuestion: {},
    answeredQuestions: [],
    score: [],
    userResponse: '',
    numberOfPlayers: 0
}
const store = createStore(reducer);
console.log(store);

function reducer(state = initState, action) {
    if (action.type === "UPDATE_RESULTS") {
        return {
            ...state,
            results: action.results
        }
    }
    if (action.type === "SELECT_CLUE") {
        return {
            ...state,
            currentQuestion: action.clue
        }
    }
    if (action.type === "RECORD_RESPONSE") {
        return {
            ...state,
            userResponse: action.response
        }
    }
    if (action.type === "CORRECT_ANSWER") {
        var newScore = state.score;
        newScore[action.player] += state.currentQuestion.value;
        return {
            ...state,
            score: newScore
        }
    }
    if (action.type === "WRONG_ANSWER") {
        var newScore = state.score;
        newScore[action.player] -= state.currentQuestion.value;
        return {
            ...state,
            score: newScore
        }
    }
    if (action.type === "QUESTION_ANSWERED") {
        return {
            ...state,
            currentQuestion: {},
            answeredQuestions: [...state.answeredQuestions, state.currentQuestion.id]
        }
    }
    if (action.type === "NUMBER_OF_PLAYERS") {
        var listOfScores = new Array(action.number + 1).fill(0)
        console.log(listOfScores)
        return {
            ...state,
            numberOfPlayers: action.number,
            score: listOfScores
        }
    }


    return state;
}

ReactDOM.render(<Provider store={store}>
    <App /></Provider>, document.getElementById('root'));