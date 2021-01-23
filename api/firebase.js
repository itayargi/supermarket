import * as firebase from 'firebase';

var firebaseConfig = {

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
