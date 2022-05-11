import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'

export default {
  data() {
    return { error: null, auth: null, loggedUser: null }
  },
  methods: {
    async $getCurrentUser() {
      this.auth = await getAuth()
    },
    async $logout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.logoutSuccess()
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        })
    },
    async $login(email, password) {
      this.error = null
      this.loggedUser = null

      const auth = getAuth()

      // Signed in
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.loggedUser = userCredential.user
          // console.log('loggedUser:', this.loggedUser)
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
            this.afterSignup(user)
          })
        })
        .catch((_error) => {
          this.error = _error.message
          console.log('User Create fail => ' + this.error)
        })
    },
    async $updateProfile(_currentUser, _obj) {
      updateProfile(_currentUser, _obj).then(() => {
        // Profile updated!
        console.log('Profile updated!', _currentUser)
      })
    }
  }
}
