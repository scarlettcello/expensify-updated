import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBaqM3QI7RwHd6djcJeuxZFoqGkpeRT52o",
  authDomain: "expense-tracker-e13b6.firebaseapp.com",
  databaseURL: "https://expense-tracker-e13b6.firebaseio.com",
  projectId: "expense-tracker-e13b6",
  storageBucket: "expense-tracker-e13b6.appspot.com",
  messagingSenderId: "399766565144",
  appId: "1:399766565144:web:0a728f755ec80939c7ae6d"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default }

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

database.ref('expenses').push({
  description: 'Coffee',
  amount: 499,
  createdAt: 30000,
  note: 'Nescafe decaf'
});

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