import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return { error: null, url: null, filePath: null, downloadURL: null }
  },
  methods: {
    async $deleteFile(filePath) {
      const storage = getStorage()
      // const storageRef = ref(storage, 'images/desert.jpg');
      const storageRef = ref(storage, filePath)

      // Delete the file
      deleteObject(storageRef)
        .then(() => {
          console.log(`${filePath} deleted successfully`)
        })
        .catch((error) => {
          console.log('Uh-oh, an error occurred!', error)
        })
    },
    async $uploadImage(path, file, i, callback = null) {
      if (!file) {
        console.log('No File Selected')
        return
      }

      const storage = getStorage()
      const storageRef = ref(storage, path)

      this.error = null

      // image 파일을 thumbnails 스토리지에 업로드
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log('file uploaded!')

          // console.log('getDownloadURL start')
          getDownloadURL(ref(storage, path))
            .then((url) => {
              const xhr = new XMLHttpRequest()
              xhr.responseType = 'blob'
              xhr.onload = (event) => {
                const blob = xhr.response
              }
              xhr.open('GET', url)
              // xhr.send()
              console.log('get downloadURL ', url)
              // this.post.thumb_url = url
              if (callback) {
                callback(i, url)
              }
            })
            .catch((error) => {
              // Handle any errors
              console.log(error)
            })
        })
        .catch((err) => {
          console.log(err.message)
          // this.error = err.message
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
    // async $getDownloadURL(filePath) {
    //   // Create a root reference
    //   const storage = getStorage()

    //   getDownloadURL(ref(storage, filePath))
    //     .then((url) => {
    //       const xhr = new XMLHttpRequest()
    //       xhr.responseType = 'blob'
    //       xhr.onload = (event) => {
    //         const blob = xhr.response
    //       }
    //       xhr.open('GET', url)
    //       // xhr.send()

    //       console.log('get downloadURL 성공! ', url)
    //       return url

    //       // Or inserted into an <img> element
    //       // const img = document.getElementById('myimg');
    //       // img.setAttribute('src', url);
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //       console.log(error)
    //       return null
    //     })
    // },
  }
}
