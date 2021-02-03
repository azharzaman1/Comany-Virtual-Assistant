import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA8cQIaybM1Y4grt6fXtKV5sQeQFknj1uk",
  authDomain: "virtual-assistant-applic-68a5e.firebaseapp.com",
  projectId: "virtual-assistant-applic-68a5e",
  storageBucket: "virtual-assistant-applic-68a5e.appspot.com",
  messagingSenderId: "3905280294",
  appId: "1:3905280294:web:61b3084fbced1ace5109e7",
});

export const auth = app.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
