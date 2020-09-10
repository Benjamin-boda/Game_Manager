import React from 'react';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {startSetGames} from "./actions/games";
import AppRouter, {history} from "./routers/AppRouter";
import {login, logout} from "./actions/auth";
import {firebase} from "./firebase/firebase";
import "./styles/styles.scss";
import "normalize.css/normalize.css";

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("root"));
        hasRendered = true;
    }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      store.dispatch(login(user.uid));
      store.dispatch(startSetGames()).then(() => {
          renderApp();
      });
  } else {
      store.dispatch(logout());
      renderApp();
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
