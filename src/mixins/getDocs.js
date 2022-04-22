import { db } from '../firebase/config'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

export default {
  methods: {
    async $load(_collectionName, _orderBy) {
      const collectionRef = collection(db, _collectionName)
      const q = query(collectionRef, orderBy(_orderBy), limit(300))

      const docs = []
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        docs.push({ ...doc.data(), id: doc.id })
      })

      return docs
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
