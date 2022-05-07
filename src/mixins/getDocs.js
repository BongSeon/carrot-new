import { db } from '../firebase/config'
import {
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

export default {
  methods: {
    async $getDocs(_collectionName, _orderBy = null) {
      const collectionRef = collection(db, _collectionName)
      let q = null
      if (_orderBy === null) {
        q = query(collectionRef, limit(300))
      } else {
        q = query(collectionRef, orderBy(_orderBy, 'desc'), limit(300))
      }

      const docs = []
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        docs.push({ ...doc.data(), id: doc.id })
      })

      return docs
    },
    async $getDoc(_collectionName, _id) {
      const docRef = doc(db, _collectionName, _id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data())
        return docSnap.data()
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        return null
      }
    },
    async $loadImages(_collectionName, _product_id, _orderBy) {
      const collectionRef = collection(db, _collectionName)
      const q = query(
        collectionRef,
        where('product_id', '==', _product_id),
        orderBy(_orderBy),
        limit(300)
      )

      const docs = []
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        docs.push({ ...doc.data(), id: doc.id })
      })

      return docs
    }
  }
}
