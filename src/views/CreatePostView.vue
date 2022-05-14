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
            v-for="image in images"
            :key="image.filename"
            class="pic img-pic"
            :src="image.url"
            :alt="image.filename"
          />
          <div v-if="images.length < 1">
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

// And then import in whichever component you like in this way:
import resizeImage from '@/plugins/image-resize.js'

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
        chat_count: 0,
        favorate_count: 0,
        uid: ''
      },
      files: [],
      file: null,
      categories: [],
      thumbnail: null,
      images: [
        // {
        //   filename: '',
        //   url: ''
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
    try {
      this.getCategories()
      const uid = this.$store.getters['user/userInfo'].uid
      this.post.uid = uid
    } catch (error) {
      this.$router.push({ path: '/' })
    }
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

    handleAfterImageUpload(i, url) {
      if (i < 0) {
        this.thumbnail.url = url
      } else if (i >= 0) {
        this.images[i].url = url
      }
    },
    // file 선택이 변경될때마다 호출
    // e.target.files 의 모든 file들은 products 에 저장
    // file[0] 은 썸네일 이미지로 따로 저장
    async handleChange(e) {
      this.thumbnail = null
      this.images = []
      // this.files = e.target.files
      // console.log(e.target.files)

      // const selected = e.target.files[0]
      // console.log(selected.name)
      const files = e.target.files
      const file = files[0]

      console.log(file)

      for (let i = 0; i < files.length; i++) {
        // 썸네일 이미지 업로드
        const file = files[i]
        if (i === 0) {
          resizeImage({ file: file, maxSize: 128 })
            .then((resizedImage) => {
              const path = `thumbnails/${this.post.uid}/${file.name}`
              // console.log(resizedImage)
              this.thumbnail = { name: file.name, path: path, url: '' }
              this.$uploadImage(
                path,
                resizedImage,
                -1,
                this.handleAfterImageUpload
              ) // -1 전달
            })
            .catch((err) => {
              console.error(err)
            })
        }

        const path = `images/${this.post.uid}/${file.name}`
        this.images.push({ name: file.name, path: path, url: '' })
        this.$uploadImage(path, file, i, this.handleAfterImageUpload)
      }
    },
    async submitPost() {
      // validation check
      if (
        this.post.title === '' ||
        this.post.category === '' ||
        this.post.price === null ||
        this.post.description === ''
      ) {
        this.$refs.toast.open('항목을 모두 작성해주세요')
        return
      }
      if (this.images.length < 1) {
        this.$refs.toast.open('이미지를 첨부해주세요')
        return
      }

      const postDoc = {
        ...this.post,
        thumb_path: this.thumbnail.path,
        thumb_url: this.thumbnail.url,
        created_datetime: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, 'posts'), postDoc).catch(
        (_error) => {
          // this.error = _error.message
          console.log('Create Post fail => ' + this.error)
        }
      )
      console.log('posts 컬렉션에 doc을 생성했습니다 ID: ', docRef.id)

      for (let i = 0; i < this.images.length; i++) {
        const imageDoc = {
          num: i,
          product_id: docRef.id,
          post_title: this.post.title,
          file_path: this.images[i].path,
          url: this.images[i].url
        }
        const imageDocRef = await addDoc(
          collection(db, 'images'),
          imageDoc
        ).catch((_error) => {
          // this.error = _error.message
          console.log('Create Post fail => ' + _error)
        })
        console.log(
          i + ': images 컬렉션에 doc을 생성했습니다  ID: ',
          imageDocRef.id
        )
      }

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
