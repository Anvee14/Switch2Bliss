import firebase from 'firebase';
require('@firebase/firestore')


var firebaseConfig = {
    apiKey: "AIzaSyAmTNifq7rIh2zveVTs0PuCDSyRqjcEx3w",
    authDomain: "switch2bliss-e1536.firebaseapp.com",
    projectId: "switch2bliss-e1536",
    storageBucket: "switch2bliss-e1536.appspot.com",
    messagingSenderId: "726771994332",
    appId: "1:726771994332:web:e720bfb5ea6f033307ee19"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();

