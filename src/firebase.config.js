import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD9xjZhkmUN24hFL44-DZQwjhhh-FJ9gWM',
  authDomain: 'house-marketplace-app-d22e6.firebaseapp.com',
  projectId: 'house-marketplace-app-d22e6',
  storageBucket: 'house-marketplace-app-d22e6.appspot.com',
  messagingSenderId: '444559590342',
  appId: '1:444559590342:web:b2ae2f25e2247baacce8c7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
