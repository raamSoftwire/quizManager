import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "quizmanager-raam.firebaseapp.com",
  databaseURL: "https://quizmanager-raam.firebaseio.com",
  projectId: "quizmanager-raam",
  storageBucket: "quizmanager-raam.appspot.com",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const app = firebase.initializeApp(config);
export const db = firebase.firestore!();

