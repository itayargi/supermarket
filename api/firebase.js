import firebase from "firebase";

var firebaseConfig = {
    // apiKey: "AIzaSyDAW6Svimohavnn88YIl0A1iZLoLyFv_KA",
    // authDomain: "supermarket-da4cc.firebaseapp.com",
    databaseURL: "https://supermarket-da4cc.firebaseapp.com",
    // projectId: "supermarket-da4cc",
    // storageBucket: "supermarket-da4cc.appspot.com",
    // messagingSenderId: "177954718478",
    // appId: "1:177954718478:web:32ee894773081b9fb64d5f",
    // measurementId: "G-WW12E3SL3Y"
    apiKey: "AIzaSyDAW6Svimohavnn88YIl0A1iZLoLyFv_KA",
    authDomain: "supermarket-da4cc.firebaseapp.com",
    projectId: "supermarket-da4cc",
    storageBucket: "supermarket-da4cc.appspot.com",
    messagingSenderId: "177954718478",
    appId: "1:177954718478:web:32ee894773081b9fb64d5f",
    measurementId: "G-WW12E3SL3Y"
};

const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// Get a reference to the database service
// var database = firebase.database();
// console.log('data from firebase', database)
export default app;
