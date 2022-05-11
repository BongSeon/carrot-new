import { db } from '../firebase/config'
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'

export default {
  data() {
    return { error: null }
  },
  methods: {
    // doc id를 직접 할당
    async $setDoc(_collectionName, _docId, _postData) {
      this.error = null

      await setDoc(doc(db, _collectionName, _docId), _postData).catch(
        (_error) => {
          this.error = _error.message
          console.log('Create Post fail => ' + this.error)
        }
      )
    },
    // doc id는 자동 생성
    async $addDoc(_collectionName, _postData) {
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
    async $updateThumbUrl(_collectionName, _docId, _url) {
      this.error = null

      const docRef = doc(db, _collectionName, _docId)

      const res = await updateDoc(docRef, {
        thumb_url: _url
      }).catch((_error) => {
        this.error = _error.message
        console.log('Update post fail => ' + this.error)
      })
    },
    async $updateDoc(_collectionName, _docId, _obj) {
      this.error = null

      const docRef = doc(db, _collectionName, _docId)

      const res = await updateDoc(docRef, _obj).catch((_error) => {
        this.error = _error.message
        console.log('Update post fail => ' + this.error)
      })
    }
  }
}
