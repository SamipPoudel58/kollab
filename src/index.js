import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";

import firebase from "./config/fbConfig";
import "firebase/firestore";

//! Also updated the code in rootreducer
//* Firebase related data are stored in fbConfig,index.js,rootreducer,projectAction
//! This section of the code is updated
const rrfConfig = {
  userProfile: "users", // tells firebase to look into users collection to find the current user information
  useFirestoreForProfile: true,
};
///////////////////////////

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
);

//! This section of the code is updated
const rffProps = {
  firebase,
  useFirestoreForProfile: true,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
//////////////////////////////////

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rffProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
