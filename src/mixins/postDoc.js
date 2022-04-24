import { db } from '../firebase/config'
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
//   limit
// } from 'firebase/firestore'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default {
  data() {
    return { error: null }
  },
  methods: {
    async $postUser() {
      this.error = null

      const docRef = await addDoc(collection(db, _collectionName), {
        ..._postData,
        created_datetime: serverTimestamp()
      })
    },
    async $post(_collectionName, _postData) {
      // Add a new document with a generated id. (id 자동 생성)
      const docRef = await addDoc(collection(db, _collectionName), {
        ..._postData
      })
        .then(() => {
          console.log('Document written with ID: ', docRef.id)
          return true
        })
        .catch((_error) => {
          this.error = _error.message
          console.log('Create Post fail => ' + this.error)
        })
    },
    async $postWithDatetime(_collectionName, _postData) {
      this.error = null

      // Add a new document with a generated id. (id 자동 생성)
      const docRef = await addDoc(collection(db, _collectionName), {
        ..._postData,
        created_datetime: serverTimestamp()
      }).catch((_error) => {
        this.error = _error.message
        console.log('Create Post fail => ' + this.error)
      })
    }
  }
}
