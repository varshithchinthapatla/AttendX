import { initializeApp } from 'firebase/app'

import {
  getAuth,
  GoogleAuthProvider
} from 'firebase/auth'

const firebaseConfig = {
  apiKey:
    'AIzaSyBWwXlbUFKd6t_mSAE3ZyLcinawlx-Bu54',

  authDomain:
    'attendx-a98c8.firebaseapp.com',

  projectId:
    'attendx-a98c8',

  storageBucket:
    'attendx-a98c8.firebasestorage.app',

  messagingSenderId:
    '204107821000',

  appId:
    '1:204107821000:web:f7cefa78a96145a215dafd'
}

const app =
  initializeApp(firebaseConfig)

export const auth =
  getAuth(app)

export const googleProvider =
  new GoogleAuthProvider()

export default app