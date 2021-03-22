import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCPpYEkVOlcXQ8Wa7R1miyTZRY4_XQLceE",
    authDomain: "crown-db-a3417.firebaseapp.com",
    projectId: "crown-db-a3417",
    storageBucket: "crown-db-a3417.appspot.com",
    messagingSenderId: "96934575451",
    appId: "1:96934575451:web:a73dc5ef412b36c0242e7e",
    measurementId: "G-VTFCYNSQ80"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
if(!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();

if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
     await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
     })
    } catch (error) {
   console.log('error creating user', error.message);
    }
}

return userRef;
    
  };
  
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
