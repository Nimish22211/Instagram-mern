import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDRTKPgk1LETX1fhS12x6bvdqXe0wAiS-A",
    authDomain: "myinstagram-app-clone.firebaseapp.com",
    projectId: "myinstagram-app-clone",
    storageBucket: "myinstagram-app-clone.appspot.com",
    messagingSenderId: "571482513257",
    appId: "1:571482513257:web:db6b6dee6df3136d3127f8",
    measurementId: "G-GBLY0H0Y44"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage()


export { auth, app, storage }