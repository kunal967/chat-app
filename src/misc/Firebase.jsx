/* eslint-disable no-unused-vars */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyDfqEQoYVktFMcU5A7LmLLxMa-7jMCjesg",
    authDomain: "chaa-ats.firebaseapp.com",
    databaseURL : "https://chaa-ats-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "chaa-ats",
    storageBucket: "chaa-ats.appspot.com",
    messagingSenderId: "396007634917",
    appId: "1:396007634917:web:96c00742de652f9b4be10c",
    measurementId: "G-3TMF2BDPD0"
  };

const app = firebase.initializeApp(config)
export const auth = app.auth()
export const database = app.database()