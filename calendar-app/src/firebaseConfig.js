import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyARmPvH6teCYF7Idq8giEiHafTWyoVINZQ",
  
    authDomain: "calendar-b8a3b.firebaseapp.com",
  
    projectId: "calendar-b8a3b",
  
    storageBucket: "calendar-b8a3b.appspot.com",
  
    messagingSenderId: "783178412230",
  
    appId: "1:783178412230:web:2f62ea5443c1ac3d87a7c7",
  
    measurementId: "G-FM5R3ELDXG" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
