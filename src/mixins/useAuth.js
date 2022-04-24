import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'

// const error = ref(null)

export default {
  data() {
    return { error: null, loggedUser: null }
  },
  methods: {
    async $getCurrentUser() {
      const auth = await getAuth()
      // console.log(auth)
      return auth.currentUser
    },
    async $login(email, password) {
      this.error = null
      this.loggedUser = null

      const auth = getAuth()

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          this.loggedUser = userCredential.user
          //console.log(user.displayName + ' loged in')
          // console.log('u:', user)
          // return user
        })
        .catch((_error) => {
          this.error = _error.message
          console.log('User Login fail => ' + this.error)
        })
    },
    async $signup(email, password, displayName) {
      this.error = null

      const auth = getAuth()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/carrot-new.appspot.com/o/dongle-gray.jpg?alt=media&token=c5bb5ab2-5e34-4dfd-90cf-d1cb1e2419c1'
          }).then(() => {
            // Profile updated!
            console.log('Profile updated!', auth.currentUser)
            const user = userCredential.user
            return user
          })
        })
        .catch((_error) => {
          this.error = _error.message
          console.log('User Create fail => ' + this.error)
        })
    }
  }
}
