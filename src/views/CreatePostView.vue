<template>
  <div v-show="show" class="createpost-wrap">
    <header class="header">
      <div class="header__close">
        <button class="btn-close" @click="backToHome">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="header__title">중고거래 글쓰기</div>

      <div class="header__buttons">
        <button class="btn-submit" @click="submitPost">완료</button>
      </div>
    </header>
    <main class="createpost notosanskr">
      <section class="file">
        <label for="imgfile">
          <div class="btn-pic">
            <img
              class="icon"
              src="@/assets/icons/camera-fill.svg"
              alt="bell-icon"
            />
            <span>{{ files ? files.length : 0 }}/10</span>
          </div></label
        >
        <div class="file-selected">
          <div v-if="files.length > 1" class="error">
            아직 하나의 파일 업로드만 지원합니다. 하나의 파일만 선택해주세요.
          </div>
          <div v-else>{{ file ? file.name : '선택된 파일이 없습니다.' }}</div>
        </div>

        <input
          type="file"
          id="imgfile"
          @change="handleChange"
          accept=".png, .jpg, .jpeg"
          multiple
        />
      </section>
      <section>
        <input
          type="text"
          class="form-control"
          placeholder="글제목"
          v-model.trim="post.title"
        />
      </section>
      <section>
        <input
          type="text"
          class="form-control"
          placeholder="카테고리 선택"
          v-model.trim="post.category"
        />
      </section>
      <section class="section-price">
        <div class="input-price">
          <span class="won-sign">₩</span>
          <input
            v-number
            type="text"
            class="form-control form-control-price"
            placeholder="가격 (선택사항)"
            v-model.trim="post.price"
          />
        </div>
        <div class="input-price-offer">
          <p>
            <input type="checkbox" id="a" />
            <label for="a">가격제안 받기</label>
          </p>
        </div>
      </section>
      <section class="section-description">
        <textarea
          type="text"
          class="form-textarea"
          placeholder="게시글 내용을 작성해주세요.(가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
          v-model.trim="post.description"
        />
      </section>
    </main>
    <Toast ref="toast" />
  </div>
</template>
<script>
import { db } from '../firebase/config'
import useAuth from '@/mixins/useAuth.js'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import useStorage from '@/mixins/useStorage.js'
import postDoc from '@/mixins/postDoc.js'
import Spinner from '@/components/global/Spinner.vue'
import Toast from '@/components/global/Toast.vue'

// allowed file types
const types = ['image/png', 'image/jpeg', 'image/jpeg']
export default {
  mixins: [useAuth, useStorage, postDoc],
  components: { Spinner, Toast },
  data() {
    return {
      show: false,
      post: {
        title: '',
        category: '',
        price: null,
        price_offer_yn: false,
        description: '',
        place: '랜덤동',
        thumb_url: null,
        chat_count: 0,
        favorate_count: 0,
        uid: ''
      },
      files: [],
      file: null
    }
  },
  directives: {
    number: {
      mounted(el) {
        el.addEventListener('input', () => {
          // console.log(event.target.value)
          event.target.value = event.target.value.replace(/[^0-9]/g, '')
        })
      }
    }
  },
  setup() {},
  created() {
    setTimeout(() => {
      this.show = true
    }, 50)
  },
  mounted() {},
  unmounted() {},
  methods: {
    backToHome() {
      this.$router.push({ path: '/home' })
    },
    updateThumbUrl(doc_id, thumb_url) {
      const collection = 'posts'
      this.$updateThumbUrl(collection, doc_id, thumb_url)
    },
    handleChange(e) {
      this.files = e.target.files
      console.log(e.target.files)

      const selected = e.target.files[0]
      console.log(selected.name)

      // 한번 더 파일타입 체크 하는 경우
      // if(selected && types.includes(selected.type))
      if (selected) {
        this.file = selected
      } else {
        this.file = null
      }
    },
    async submitPost() {
      if (
        this.post.title === '' ||
        this.post.category === '' ||
        this.post.price === null ||
        this.post.description === ''
      ) {
        this.$refs.toast.open('항목을 모두 작성해주세요')
        return
      }
      const uid = this.$store.getters['user/userInfo'].uid

      try {
        if (uid) {
          this.post.uid = uid
          this.uploadImage(this.post.uid, this.file)
        }
      } catch (err) {
        console.log(err)
        this.$emit('toastShow', '잠시후 다시 시도해주세요.')
      }
    },
    async uploadImage(uid, file) {
      if (!file) {
        console.log('No File Selected')
        return
      }
      const thumbFile = file
      const prodFile = file

      // thumbnail filepath
      const thumbPath = `thumbnails/${uid}/${thumbFile.name}`

      // product filepath
      const productsPath = `products/${uid}/${prodFile.name}`

      const thumbStorage = getStorage()
      const thumbStorageRef = ref(thumbStorage, thumbPath)

      const productsStorage = getStorage()
      const productsStorageRef = ref(productsStorage, productsPath)

      this.error = null

      // image 파일을 thumbnails 스토리지에 업로드
      uploadBytes(thumbStorageRef, thumbFile)
        .then((snapshot) => {
          console.log('thumbFile uploaded!')

          // console.log('getDownloadURL start')
          getDownloadURL(ref(thumbStorage, thumbPath))
            .then((url) => {
              const xhr = new XMLHttpRequest()
              xhr.responseType = 'blob'
              xhr.onload = (event) => {
                const blob = xhr.response
              }
              xhr.open('GET', url)
              // xhr.send()
              console.log('thumbFile get downloadURL ', url)
              this.post.thumb_url = url

              // image 파일을 products 스토리지에 업로드
              uploadBytes(productsStorageRef, prodFile)
                .then((snapshot) => {
                  console.log('prodFile uploaded!')

                  // console.log('getDownloadURL start')
                  getDownloadURL(ref(productsStorage, productsPath))
                    .then((url) => {
                      const xhr = new XMLHttpRequest()
                      xhr.responseType = 'blob'
                      xhr.onload = (event) => {
                        const blob = xhr.response
                      }
                      xhr.open('GET', url)
                      // xhr.send()
                      const prodURL = url
                      console.log('prodFile get downloadURL ', prodURL)

                      const postDoc = {
                        ...this.post,
                        thumb_path: thumbPath,
                        created_datetime: serverTimestamp()
                      }

                      this.addDocToPostsAndImages(
                        postDoc,
                        prodURL,
                        productsPath
                      )
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
          // this.error = err.message
        })
    },
    async addDocToPostsAndImages(postDoc, prodURL, productsPath) {
      const docRef = await addDoc(collection(db, 'posts'), postDoc).catch(
        (_error) => {
          // this.error = _error.message
          console.log('Create Post fail => ' + this.error)
        }
      )
      console.log('posts 컬렉션에 doc을 생성했습니다 ID: ', docRef.id)

      const imageDoc = {
        num: 1,
        product_id: docRef.id,
        url: prodURL,
        post_title: this.post.title,
        file_path: productsPath
      }
      const imageDocRef = await addDoc(
        collection(db, 'images'),
        imageDoc
      ).catch((_error) => {
        // this.error = _error.message
        console.log('Create Post fail => ' + _error)
      })
      console.log('images 컬렉션에 doc을 생성했습니다  ID: ', imageDocRef.id)

      this.$emit('toastShow', '게시글이 작성되었습니다.')
      this.$router.push({ path: '/home' })
    }

    // async handleAfterImageUpload(downloadURL, filePath) {
    //   this.post.thumb_url = downloadURL
    //   console.log(this.post)

    //   // await this.$postWithDatetime('posts', this.post)
    //   const docRef = await addDoc(collection(db, 'posts'), {
    //     ...this.post,
    //     created_datetime: serverTimestamp()
    //   }).catch((_error) => {
    //     // this.error = _error.message
    //     console.log('Create Post fail => ' + this.error)
    //   })
    //   console.log('Document written with ID: ', docRef.id)

    //   const imageDocRef = await addDoc(collection(db, 'images'), {
    //     num: 1,
    //     product_id: docRef.id,
    //     url: downloadURL,
    //     post_title: this.post.title,
    //     file_path: filePath
    //   }).catch((_error) => {
    //     // this.error = _error.message
    //     console.log('Create Post fail => ' + this.error)
    //   })
    //   console.log('Document written Images with ID: ', imageDocRef.id)

    //   this.$emit('toastShow', '게시글이 작성되었습니다.')
    //   this.$router.push({ path: '/home' })
    // }
  }
}
</script>
<style scoped>
.header .header__buttons {
  width: auto;
}

input {
  margin: 0;
  border: 0;
}
input::placeholder,
textarea::placeholder {
  color: #cdcdcd;
}

.createpost {
  height: calc(100vh - 120px);
}
section {
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
}
section.file {
  display: flex;
  align-items: center;
}
.file-selected {
  width: 200px;
  padding-left: 8px;
}

.btn-submit {
  color: var(--primary);
}
.btn-pic {
  cursor: pointer;
  border: 1px solid var(--color-dark-white);
  border-radius: 4px;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn-pic img {
  width: 24px;
}
.btn-pic span {
  font-size: 14px;
}

.section-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input[id='a'] + label {
  cursor: pointer;
}
input[type='checkbox'] {
  width: 14px;
  height: 14px;
  cursor: pointer;
  position: relative;
  top: 2px;
  margin-right: 2px;
}
input[type='file'] {
  visibility: hidden;
  width: 0px;
}
.price-offer {
  font-size: 12px;
  line-height: 20px;
}
.form-checkbox {
  width: 14px;
  height: 14px;
  line-height: 14px !important;
}
.input-price-offer label {
  font-size: 14px;
}
.won-sign {
  color: var(--color-light-grey);
  font-family: Arial, Helvetica, Avenir, sans-serif;
}
.form-control-price {
  width: auto;
}
.section-description {
  height: calc(100% - 297px);
}
.section-description input {
  width: 98%;
}
</style>
