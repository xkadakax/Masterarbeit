import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAUHunrGhigjACX6G6TUFXCgoq0Bez2fh4",
  authDomain: "moods-bfc51.firebaseapp.com",
  databaseURL: "https://moods-bfc51-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moods-bfc51",
  storageBucket: "moods-bfc51.appspot.com",
  messagingSenderId: "1071286120480",
  appId: "1:1071286120480:web:861eb8a1a99a41ef418c45"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getDatabase(appFirebase);

export { db, appFirebase };

