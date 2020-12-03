import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

firebase.default.initializeApp(firebaseConfig);

export const auth = firebase.default.auth();
export const googleAuthProvider = new firebase.default.auth.GoogleAuthProvider();
