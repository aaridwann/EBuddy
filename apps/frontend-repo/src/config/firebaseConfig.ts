import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA_1i0KQ1ar0fO8t6Wr8Erzruc_7U6ala0',
  authDomain: 'hardian01-f0468.firebaseapp.com',
  projectId: 'hardian01-f0468',
  storageBucket: 'hardian01-f0468.appspot.com',
  messagingSenderId: '381871070560',
  appId: '1:381871070560:web:dbe2dec07f044b5d1e1205',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
