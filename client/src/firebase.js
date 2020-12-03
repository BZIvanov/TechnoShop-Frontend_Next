import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCTOf3XCXcob2Yc4m7JsrUG51hjBszRAGM',
  authDomain: 'react-shop-31028.firebaseapp.com',
  databaseURL: 'https://react-shop-31028.firebaseio.com',
  projectId: 'react-shop-31028',
  storageBucket: 'react-shop-31028.appspot.com',
  messagingSenderId: '1089621136026',
  appId: '1:1089621136026:web:a8578b813b3bf77818c523',
};

firebase.default.initializeApp(firebaseConfig);

export const auth = firebase.default.auth();
export const googleAuthProvider = new firebase.default.auth.GoogleAuthProvider();
