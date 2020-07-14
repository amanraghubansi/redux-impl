import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore} from './redux/store-creator';
import MyProvider from './redux/my-provider';
import ConnectedNoteApp from './components/NoteAppContainer';
import noteReducer from './redux/note-reducer';



const store = createStore(noteReducer);
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
