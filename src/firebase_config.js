import  firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
const app = firebase.initializeApp({
    apiKey: "AIzaSyAnPQTGIjOSd9iFsbmk2rVKQ67f5i3qXaQ",
    authDomain: "taskmanager-cf4f9.firebaseapp.com",
    databaseURL: "https://taskmanager-cf4f9.firebaseio.com",
    projectId: "taskmanager-cf4f9",
    storageBucket: "taskmanager-cf4f9.appspot.com",
    messagingSenderId: "665083271462",
    appId: "1:665083271462:web:9e6762219a8fe73adb89e7",
    measurementId: "G-CWPTHMKE8J"
});
export  {app as default}