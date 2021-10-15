import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'dotenv';

// import { seedDatabase } from '../seed';
// Firebase initialization 
// does ALL of this need to be in process.env? including the domain, etc?
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
// fire once
// seedDatabase(firebase);
// console.log('firebase', firebase);
// console.log(seedDatabase);
export { firebase, FieldValue };
