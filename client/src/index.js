import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/theme.css";
import "./assets/css/style.css";

import App from "./base/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./base/store/reducers/index";
/**
 *
 *  APOLLO CLIENT
 */
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
/**
 *
 *  SETUP APOLLO PROVIDER
 */
let httpLink = createUploadLink({
  uri: "https://mirthe.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

httpLink = authLink.concat(httpLink);

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
