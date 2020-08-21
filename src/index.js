import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import reducer from "./redux/reducers/reducer";
import auth from "./redux/reducers/auth";
import config from "./config";
import store from "./redux/store";

//cusome code akash
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { loadUser, logout } from "./redux/actions/auth";

// Check for token to keep user logged in
if (localStorage.token) {
  // Set auth token header auth
  const token = localStorage.token;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(loadUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());

    // Redirect to login
    window.location.href = "./login";
  }
}
const storeb = createStore(reducer);
const storeauth = createStore(auth);
const app = (
  <Provider store={store}>
    {/* <Provider store={storeauth}>
    <Provider store={storeb}> */}
    <BrowserRouter basename={config.basename}>
      {/* basename="/datta-able" */}
      <App />
    </BrowserRouter>
  </Provider>
  /*  </Provider>
    </Provider> */
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
