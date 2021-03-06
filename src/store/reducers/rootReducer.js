import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firebase: firebaseReducer, // for firebase auth
  firestore: firestoreReducer, // for firestore database
});

export default rootReducer;
