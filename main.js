import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'
import {helloSaga} from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(helloSaga);

const action = type => store.dispatch({type});

function render() {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => action('INCREMENT')}
            onDecrement={() => action('DECREMENT')}/>,
        document.getElementById('root')
    )
}

render();
store.subscribe(render);
