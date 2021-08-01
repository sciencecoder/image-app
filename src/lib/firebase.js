import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';
const config = {
  apiKey: 'AIzaSyAw5OpXNDahaEIe-oHXB6fKvNjVFtdNFv0',
  authDomain: 'experimental-315720.firebaseapp.com',
  projectId: 'experimental-315720',
  storageBucket: 'experimental-315720.appspot.com',
  messagingSenderId: '78958057294',
  appId: '1:78958057294:web:87565a0532e26e65d4701f',
  measurementId: 'G-V7DWXTD7KQ',
};
const firebase = Firebase.initializeApp(config);
const FieldValue = Firebase.firestore;
// fire once
// seedDatabase(firebase);
// console.log('firebase', firebase);
// console.log(seedDatabase);
export { firebase, FieldValue };
