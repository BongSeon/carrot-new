import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID
}

// console.log(process.env)

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig)
// Cloud Firestore 인스턴스를 초기화
const db = getFirestore()
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app)

export { app, db, storage }
