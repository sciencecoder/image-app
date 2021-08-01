import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseContext } from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';

ReactDOM.render(
  <firebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </firebaseContext.Provider>,
  document.getElementById('root')
);
// Cient side rendered app (reactjs)
/* -> database is firebase
react-loading-skeleton
tailwind css 
architecture
    src ->
        compoennts
         constants
         context
         helpers
         lib -> firebase will live here
         services -> firebase function
         styles -> tailwinds styles
         */
