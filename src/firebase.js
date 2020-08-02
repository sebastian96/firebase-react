import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBHqumuxHybyGLhjw3RsC3Cnfgf16uyb-g",
    authDomain: "fb-crud-react-b126e.firebaseapp.com",
    databaseURL: "https://fb-crud-react-b126e.firebaseio.com",
    projectId: "fb-crud-react-b126e",
    storageBucket: "fb-crud-react-b126e.appspot.com",
    messagingSenderId: "275079861723",
    appId: "1:275079861723:web:1d6f224cf7691a951c03fe"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

