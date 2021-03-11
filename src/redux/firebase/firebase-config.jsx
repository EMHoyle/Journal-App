import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAQ-tRLC7sONUU5pqNFsMJTzRCI_kqGuXI',
  authDomain: 'react-journal-app-92aa7.firebaseapp.com',
  projectId: 'react-journal-app-92aa7',
  storageBucket: 'react-journal-app-92aa7.appspot.com',
  messagingSenderId: '526643303272',
  appId: '1:526643303272:web:a41a7c1e834c6a411f3cdd',
}

firebase.initializeApp(firebaseConfig)

const dataB = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { dataB, googleAuthProvider, firebase }
