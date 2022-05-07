import { db } from '../firebase/config'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'

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
      }).catch((_error) => {
        this.error = _error.message
        console.log('Create Post fail => ' + this.error)
      })
    },
    async $post(_collectionName, _postData) {
      this.error = null

      // Add a new document with a generated id. (id 자동 생성)
      const docRef = await addDoc(collection(db, _collectionName), {
        ..._postData
      }).catch((_error) => {
        this.error = _error.message
        console.log('Create Post fail => ' + this.error)
      })
    },
    // 서버 datetime으로 created_datetime설정하면서 데이터 추가
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
      console.log('Document written with ID: ', docRef.id)

      // return docRef.id
    },
    // thumb_url 수정
    async $updateThumbUrl(_collectionName, _some_id, _url) {
      this.error = null

      const docRef = doc(db, _collectionName, _some_id)

      const res = await updateDoc(docRef, {
        thumb_url: _url
      }).catch((_error) => {
        this.error = _error.message
        console.log('Update post fail => ' + this.error)
      })
    }
  }
}
