import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const devConfig = {
  apiKey,
  authDomain: "expensify-updated.firebaseapp.com",
  databaseURL: "https://expensify-updated.firebaseio.com",
  projectId: "expensify-updated",
  storageBucket: "expensify-updated.appspot.com",
  messagingSenderId: "145327994481",
  appId: "1:145327994481:web:7fe85c13628aa1f3cbcdd0"
};

const testConfig = {
  apiKey,
  authDomain: "expensify-updated-test.firebaseapp.com",
  databaseURL: "https://expensify-updated-test.firebaseio.com",
  projectId: "expensify-updated-test",
  storageBucket: "expensify-updated-test.appspot.com",
  messagingSenderId: "829473497672",
  appId: "1:829473497672:web:41d8198f45b4a7f6a6ee7d"
}

if (process.env.NODE_ENV === 'test') {
  firebase.initializeApp(testConfig);
} else {
  firebase.initializeApp(devConfig);
}

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default }

// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// })

// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// })

// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   });

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });

//   console.log(expenses);
// });

// database.ref('expenses').push({
//   description: 'Coffee',
//   amount: 499,
//   createdAt: 30000,
//   note: 'Nescafe decaf'
// });

// database.ref('notes').push({
//   title: 'Courses',
//   body: 'React'
// });

// database.ref('notes/-MJtScZh-no5RvHstcrn').update({
//   body: 'Make spring rolls'
// });

// database.ref('notes/-MJtU-6fH0J8OEqn0zNv').remove();

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);
// });

// database.ref().once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e) => {
//     console.log('Error fetching data', e);
//   });

// database.ref().set({
//   name: 'Carol Lee',
//   age: 37,
//   stressLevel: 6,
//   job: {
//     title:'Software developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Oakville', 
//     province: 'ON', 
//     country: 'Canada'
//   } 
// }).then(() => {
//   console.log('The data is saved successfully')
// }).catch((e) => {
//   console.log(`error ${e}`);
// });

// database
//   .ref()
//   .update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
//   })