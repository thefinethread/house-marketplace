import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
initializeApp(firebaseConfig);
export const db = getFirestore();
