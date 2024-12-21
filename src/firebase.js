import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC5AzMgSfDvEjROT8PxBRhAOd52_IqxDVU",
    authDomain: "shoe-13569.firebaseapp.com",
    projectId: "shoe-13569",
    storageBucket: "shoe-13569.firebasestorage.app",
    messagingSenderId: "1085408432581",
    appId: "1:1085408432581:web:165d55b95cef947e257bac"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);