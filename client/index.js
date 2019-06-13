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
    return state;
}

ReactDOM.render(<Provider store={store}>
    <App /></Provider>, document.getElementById('root'));