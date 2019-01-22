  import firebase from 'firebase/app';
  import "firebase/auth";
  import "firebase/database";
  import "firebase/storage";
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3plKDM-Znh9AQyI23-tWc0pC92-lsqu0",
    authDomain: "slack-react-clone-db.firebaseapp.com",
    databaseURL: "https://slack-react-clone-db.firebaseio.com",
    projectId: "slack-react-clone-db",
    storageBucket: "slack-react-clone-db.appspot.com",
    messagingSenderId: "1045891525866"
  };
  firebase.initializeApp(config);

  export default firebase;