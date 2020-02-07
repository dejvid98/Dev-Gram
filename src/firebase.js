import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyD4JOwSVcO5GKvsluUPrOGRsv31EP-3Fc4",
  authDomain: "devgram-735d8.firebaseapp.com",
  databaseURL: "https://devgram-735d8.firebaseio.com",
  projectId: "devgram-735d8",
  storageBucket: "devgram-735d8.appspot.com",
  messagingSenderId: "357504798052",
  appId: "1:357504798052:web:8cb7b4b617da8c831dbe71",
  measurementId: "G-SJYJ9Z3PKQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
