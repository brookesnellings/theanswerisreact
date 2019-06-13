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
    score: 0,
    userResponse: ''
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
        return {
            ...state,
            score: state.score + state.currentQuestion.value
        }
    }
    if (action.type === "WRONG_ANSWER") {
        return {
            ...state,
            score: state.score - state.currentQuestion.value
        }
    }
    if (action.type === "QUESTION_ANSWERED") {
        return {
            ...state,
            currentQuestion: {},
            answeredQuestions: [...state.answeredQuestions, state.currentQuestion.id]
        }
    }

    return state;
}

ReactDOM.render(<Provider store={store}>
    <App /></Provider>, document.getElementById('root'));