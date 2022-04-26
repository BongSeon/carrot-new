import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return { error: null, url: null, filePath: null, downloadURL: null }
  },
  methods: {
    // storage에 썸네일 및 상품이미지 저장하는 함수
    async $uploadImage(uid, file) {
      if (!uid) {
        console.log('No UID!')
        return
      }
      if (!file) {
        console.log('No File Selected')
        return
      }
      // const auth = await getAuth()
      // const uid = auth.currentUser.uid
      // console.log(uid)
      this.filePath = `products/${uid}/${file.name}`
      console.log(this.filePath)

      // Create a root reference
      const storage = getStorage()
      // Create a reference to 'images/mountains.jpg'
      const storageRef = ref(storage, this.filePath)

      this.error = null

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log('blob(or file) upload 성공!')

          console.log('getDownloadURL start')
          getDownloadURL(ref(storage, this.filePath))
            .then((url) => {
              const xhr = new XMLHttpRequest()
              xhr.responseType = 'blob'
              xhr.onload = (event) => {
                const blob = xhr.response
              }
              xhr.open('GET', url)
              // xhr.send()

              console.log('get downloadURL 성공! ', url)
              this.handleAfterImageUpload(url)
              // Or inserted into an <img> element
              // const img = document.getElementById('myimg');
              // img.setAttribute('src', url);
            })
            .catch((error) => {
              // Handle any errors
              console.log(error)
            })
        })
        .catch((err) => {
          console.log(err.message)
          this.error = err.message
        })
    },
    async $getDownloadURL(filePath) {
      // Create a root reference
      const storage = getStorage()

      getDownloadURL(ref(storage, filePath))
        .then((url) => {
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = (event) => {
            const blob = xhr.response
          }
          xhr.open('GET', url)
          // xhr.send()

          console.log('get downloadURL 성공! ', url)
          return url

          // Or inserted into an <img> element
          // const img = document.getElementById('myimg');
          // img.setAttribute('src', url);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error)
          return null
        })
    },
    async $getAvartar(uid) {
      // Get a reference to the storage service, which is used to create references in your storage bucket
      const storage = getStorage()
      // console.log(storage)
      getDownloadURL(ref(storage, `avatars/${uid}/avatar.jpg`))
        .then((url) => {
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = (event) => {
            const blob = xhr.response
          }
          xhr.open('GET', url)
          // xhr.send()

          console.log(url)
          return url

          // Or inserted into an <img> element
          // const img = document.getElementById('myimg');
          // img.setAttribute('src', url);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error)
          return null
        })
    }
  }
}
