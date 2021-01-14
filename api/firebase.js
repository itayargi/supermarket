import * as firebase from 'firebase';

var firebaseConfig = {
    // apiKey: "AIzaSyDAW6Svimohavnn88YIl0A1iZLoLyFv_KA",
    // authDomain: "supermarket-da4cc.firebaseapp.com",
    // databaseURL: "https://supermarket-da4cc-default-rtdb.europe-west1.firebasedatabase.app",
    // projectId: "supermarket-da4cc",
    // storageBucket: "supermarket-da4cc.appspot.com",
    // messagingSenderId: "177954718478",
    // appId: "1:177954718478:web:32ee894773081b9fb64d5f",
    // measurementId: "G-WW12E3SL3Y"
    apiKey: "AIzaSyBwAbGktBQjKLYfJO_Fzu5Kmb9fwzB9CAo",
    authDomain: "my-project-1508757045723.firebaseapp.com",
    databaseURL: "https://my-project-1508757045723-default-rtdb.firebaseio.com",
    projectId: "my-project-1508757045723",
    storageBucket: "my-project-1508757045723.appspot.com",
    messagingSenderId: "360043829987",
    appId: "1:360043829987:web:738f734ead6eef69b083d6",
    measurementId: "G-L8XW1F5R5S"
};

const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// Get a reference to the database service
// var database = firebase.database();
// console.log('data from firebase', database)
export default app;
