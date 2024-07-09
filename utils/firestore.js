import app from '../lib/firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);
export { db, doc, getDoc, auth, signInAnonymously };