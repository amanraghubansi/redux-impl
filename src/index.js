import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from './redux/store-creator';
import MyProvider from './redux/my-provider';
import ConnectedNoteApp from './components/NoteAppContainer';
import noteReducer from './redux/note-reducer';
import { setTimeoutMiddleware, loggingMiddleware, setTimeoutMiddleware2, thunkMiddleware } from './redux/middleware';



// const store = createStore(noteReducer,loggingMiddleware);

// const store = createStore(noteReducer, applyMiddleware());

// const store = createStore(noteReducer, applyMiddleware(loggingMiddleware));

// const store = createStore(noteReducer, applyMiddleware(setTimeoutMiddleware,loggingMiddleware,setTimeoutMiddleware2));

const store = createStore(noteReducer, applyMiddleware(loggingMiddleware,thunkMiddleware));

ReactDOM.render(
  <MyProvider store={store}>
    <ConnectedNoteApp/>
  </MyProvider>,
  document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
