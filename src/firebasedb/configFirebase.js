// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
    //Copy and paste from Register App Firebase
    apiKey: "AIzaSyB44qHsrc7gPiGKXuHTytk2mFz98_BjTOE",
    authDomain: "memogame-9a961.firebaseapp.com",
    databaseURL: "https://memogame-9a961.firebaseio.com",
    projectId: "memogame-9a961",
    storageBucket: "memogame-9a961.appspot.com",
    messagingSenderId: "327380136771",
    appId: "1:327380136771:web:9b0f4cf05fec32791435f6",
    measurementId: "G-SQ6BW923LE",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.database();

