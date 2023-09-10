import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBAisL8ZxAo3LT8UUAMxZwhx-zVchBvnvw",
    authDomain: "cubstartattendance.firebaseapp.com",
    projectId: "cubstartattendance",
    storageBucket: "cubstartattendance.appspot.com",
    messagingSenderId: "718201051006",
    appId: "1:718201051006:web:20ce7c70a6ebe9b231c52f"
  };

const app = initializeApp(firebaseConfig);

export default app;