import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/functions";

const root = {
  apiKey: "AIzaSyCOJ1oYwiCchwBwJU_4sKE3tTO6wdujmxI",
  authDomain: "mextifiy-events.firebaseapp.com",
  databaseURL: "https://mextifiy-events.firebaseio.com",
  projectId: "mextifiy-events",
  storageBucket: "mextifiy-events.appspot.com",
  messagingSenderId: "975871438737",
  appId: "1:975871438737:web:4b349283c2b85afb3ab430",
  measurementId: "G-0YQ7RK1ZKT"
};

if (!firebase.apps.length) {
  firebase.initializeApp(root);
}
