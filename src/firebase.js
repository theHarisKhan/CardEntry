import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAtcrKIhDy7XHkt7zUodwz05nEtjUbfFvs",
    authDomain: "cardentry-61d3b.firebaseapp.com",
    projectId: "cardentry-61d3b",
    storageBucket: "cardentry-61d3b.appspot.com",
    messagingSenderId: "19846717185",
    appId: "1:19846717185:web:1b75bf71bc4dec2ecc8500"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const storage = firebase.storage()

export { storage }
export default db