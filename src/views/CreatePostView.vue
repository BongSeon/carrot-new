<template>
  <div>
    <div v-show="show" class="createpost-wrap">
      <header class="header">
        <div class="header__left">
          <button class="btn-close" @click="backToHome">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="header__center">중고거래 글쓰기</div>

        <div class="header__buttons">
          <button class="btn-submit" @click="submitPost">완료</button>
        </div>
      </header>
      <main class="createpost">
        <section class="file">
          <label for="imgfile">
            <div class="pic btn-pic">
              <img
                class="icon"
                src="@/assets/icons/camera-fill.svg"
                alt="bell-icon"
              />
              <span>{{ files ? files.length : 0 }}/10</span>
            </div></label
          >
          <img
            v-for="thumb in thumbnails"
            :key="thumb.filename"
            class="pic img-pic"
            :src="thumb.url"
            :alt="thumb.filename"
          />
          <!-- <img
            class="img-pic"
            src="@/assets/img/thumbnails/product-thumb-2.jpg"
            alt=""
          /> -->
          <!-- <div v-if="thumbnails.length > 0" class="file-selected">
             <div v-if="files.length > 1" class="error">
              아직 하나의 파일 업로드만 지원합니다. 하나의 파일만 선택해주세요.
            </div> 
          </div> -->
          <div v-if="thumbnails.length < 1">
            {{ file ? file.name : '선택된 파일이 없습니다.' }}
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
          <div
            class="btn btn-drawer"
            v-if="post.category === ''"
            @click="openCategories"
          >
            <span>카테고리 선택</span>
            <span><i class="fas fa-chevron-right"></i></span>
          </div>

          <div v-else @click="openCategories">
            {{ post.category }}
          </div>
          <!-- <input
            type="text"
            class="form-control"
            placeholder="카테고리 선택"
            v-model.trim="post.category"
          /> -->
          <!-- <div class="input-field">
          <select class="form-select" name="loan_type" v-model="post.category">
            <option value="주택담보대출">주택 담보 대출</option>
            <option value="아파트담보대출" selected>아파트 담보대출</option>
            <option value="공동명의지분대출">공동명의 지분대출</option>
            <option value="무설정아파트신용대출">
              무설정 아파트 신용 대출
            </option>
          </select>
        </div> -->
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
    </div>
    <CategoryDrawer
      :categories="categories"
      @select="selectCategory"
      @close="closeCategories"
    />
    <Toast ref="toast" />
  </div>
</template>
<script>
import Drawer from '@/mixins/drawer.js'
import useAuth from '@/mixins/useAuth.js'
import useStorage from '@/mixins/useStorage.js'
import useDocs from '@/mixins/useDocs.js'
import postDoc from '@/mixins/postDoc.js'

import Spinner from '@/components/global/Spinner.vue'
import Toast from '@/components/global/Toast.vue'
import CategoryDrawer from '@/components/CategoryDrawer.vue'

import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// allowed file types
const types = ['image/png', 'image/jpeg', 'image/jpeg']
export default {
  mixins: [useAuth, useStorage, useDocs, postDoc, Drawer],
  components: { Spinner, Toast, CategoryDrawer },
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
      file: null,
      categories: [],
      thumbnails: [
        // {
        //   filename: '',
        //   url: 'https://firebasestorage.googleapis.com/v0/b/carrot-new.appspot.com/o/thumbnails%2F2WZiX994HJQti0orknoFJRYfMln1%2Fdongle-gray.jpg?alt=media&token=8eebef8e-a77e-42c0-9e00-090631dd28ad'
        // }
      ]
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
  mounted() {
    this.getCategories()
    const uid = this.$store.getters['user/userInfo'].uid
    this.post.uid = uid
  },
  unmounted() {},
  methods: {
    async getThumbURL() {},
    async getCategories() {
      this.categories = await this.$getDocs('category')
      // console.log(this.categories)
    },
    openCategories() {
      this.$showDrawer('.category-drawer', '.createpost-wrap')
    },
    selectCategory(name) {
      this.post.category = name
      this.$closeDrawer('.category-drawer', '.createpost-wrap')
    },
    closeCategories() {
      this.$closeDrawer('.category-drawer', '.createpost-wrap')
    },
    backToHome() {
      this.$router.push({ path: '/home' })
    },
    // updateThumbUrl(doc_id, thumb_url) {
    //   const collection = 'posts'
    //   this.$updateThumbUrl(collection, doc_id, thumb_url)
    // },
    handleAfter(i, url) {
      this.thumbnails[i].url = url
    },
    async handleChange(e) {
      // this.files = e.target.files
      // console.log(e.target.files)

      // const selected = e.target.files[0]
      // console.log(selected.name)
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        this.thumbnails.push({ name: file.name, url: '' })
        const r = await this.uploadImage2(
          this.post.uid,
          file,
          i,
          this.handleAfter
        )
        console.log('r -> ', r)
      }

      for (let i = 0; i < this.thumbnails.length; i++) {
        console.log(this.thumbnails[i])
      }

      // files.forEach((file) => {
      //   console.log(file)
      // })

      // 한번 더 파일타입 체크 하는 경우
      // if(selected && types.includes(selected.type))
      // if (selected) {
      //   this.file = selected
      // } else {
      //   this.file = null
      // }
    },
    async submitPost() {
      // validation check
      // if (
      //   this.post.title === '' ||
      //   this.post.category === '' ||
      //   this.post.price === null ||
      //   this.post.description === ''
      // ) {
      //   this.$refs.toast.open('항목을 모두 작성해주세요')
      //   return
      // }
      // 기존 코드
      // const uid = this.$store.getters['user/userInfo'].uid
      // try {
      //   if (uid) {
      //     this.post.uid = uid
      //     this.uploadImage(this.post.uid, this.file)
      //   }
      // } catch (err) {
      //   console.log(err)
      //   this.$emit('toastShow', '잠시후 다시 시도해주세요.')
      // }
    },
    async uploadImage2(uid, file, i, callback) {
      if (!file) {
        console.log('No File Selected')
        return
      }
      const thumbFile = file
      const prodFile = file

      // thumbnail filepath
      const thumbPath = `thumbnails/${uid}/${thumbFile.name}`
      // product filepath
      // const productsPath = `products/${uid}/${prodFile.name}`

      const thumbStorage = getStorage()
      const thumbStorageRef = ref(thumbStorage, thumbPath)

      // const productsStorage = getStorage()
      // const productsStorageRef = ref(productsStorage, productsPath)

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
              // this.post.thumb_url = url
              callback(i, url)

              // // image 파일을 products 스토리지에 업로드
              // uploadBytes(productsStorageRef, prodFile)
              //   .then((snapshot) => {
              //     console.log('prodFile uploaded!')

              //     // console.log('getDownloadURL start')
              //     getDownloadURL(ref(productsStorage, productsPath))
              //       .then((url) => {
              //         const xhr = new XMLHttpRequest()
              //         xhr.responseType = 'blob'
              //         xhr.onload = (event) => {
              //           const blob = xhr.response
              //         }
              //         xhr.open('GET', url)
              //         // xhr.send()
              //         const prodURL = url
              //         console.log('prodFile get downloadURL ', prodURL)

              //         const postDoc = {
              //           ...this.post,
              //           thumb_path: thumbPath,
              //           created_datetime: serverTimestamp()
              //         }

              //         this.addDocToPostsAndImages(
              //           postDoc,
              //           prodURL,
              //           productsPath
              //         )
              //       })
              //       .catch((error) => {
              //         // Handle any errors
              //         console.log(error)
              //       })
              //   })
              //   .catch((err) => {
              //     console.log(err.message)
              //     // this.error = err.message
              //   })
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
.btn-submit {
  color: var(--primary);
}

section.file {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
/* .file-selected {
  width: 200px;
  padding-left: 8px;
} */
.pic {
  border: 1px solid var(--color-dark-white);
  border-radius: 4px;
  width: 70px;
  height: 70px;
  margin: 0 4px 4px 0;
}
.btn-pic {
  cursor: pointer;
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

.img-pic {
  display: flex;
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
.input-price-offer {
  padding-right: 4px;
}
.input-price-offer label {
  font-size: 14px;
}
.won-sign {
  padding-left: 4px;
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

.btn-drawer {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
}
</style>
