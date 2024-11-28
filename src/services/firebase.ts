import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYgq8iJEDjJUwhMuNx2STPgnIEvUXxwHE",
  authDomain: "personalhealth-2a6ad.firebaseapp.com",
  projectId: "personalhealth-2a6ad",
  storageBucket: "personalhealth-2a6ad.firebasestorage.app",
  messagingSenderId: "869529760681",
  appId: "1:869529760681:web:049ead651e7cc4ed690ab8",
  measurementId: "G-M44J9XPSD8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
