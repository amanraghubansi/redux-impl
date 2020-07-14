import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from './redux/store-creator';
import noteReducer, { CREATE_NOTE, UPDATE_NOTE } from './redux/note-reducer';
import MyProvider from './redux/my-provider';
import ConnectedNoteApp from './components/NoteAppContainer';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// console.log('before state',store.getState());
// store.dispatch({type : CREATE_NOTE});
// console.log('after state',store.getState());

// store.dispatch({type : UPDATE_NOTE , id : 1 , content : "Aman"});
// console.log('after state',store.getState());


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
