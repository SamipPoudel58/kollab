import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrKcAA77TyA6J8l9F29he9cGRBZ6dEdZw",
  authDomain: "mario-plan-c9c35.firebaseapp.com",
  databaseURL: "https://mario-plan-c9c35.firebaseio.com",
  projectId: "mario-plan-c9c35",
  storageBucket: "mario-plan-c9c35.appspot.com",
  messagingSenderId: "1028131747637",
  appId: "1:1028131747637:web:c26bc155f9f59422fe7e7c",
  measurementId: "G-S8BK40JP5K",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
