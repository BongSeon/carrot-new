import { db } from '../firebase/config'
import { collection, getDoc, query, orderBy, limit } from 'firebase/firestore'

export default {
  methods: {
    getCollection(collectionName) {
      const error = ref(null)
      const documents = ref(null)

      const collectionRef = collection(db, collectionName)
      const q = query(collectionRef, orderBy('createdAt'), limit(300))

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          console.log('snapshot')
          const results = []
          querySnapshot.forEach((doc) => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
          })
          // console.log(results)
          documents.value = results
          error.value = null
        },
        (err) => {
          console.log(err.message)
        }
      )
    }
  }
}
