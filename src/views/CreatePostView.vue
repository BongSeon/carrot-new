<template>
  <div class="createpost-wrap">
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
      <section>
        <div class="btn-pic">
          <img
            class="icon"
            src="@/assets/icons/camera-fill.svg"
            alt="bell-icon"
          />
          <span>0/10</span>
        </div>
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
    <!-- <Toast ref="toast" /> -->
  </div>
</template>
<script>
import PostDoc from '@/mixins/postDoc.js'
import Spinner from '@/components/global/Spinner.vue'
import Toast from '@/components/global/Toast.vue'
export default {
  mixins: [PostDoc],
  components: { Spinner, Toast },
  data() {
    return {
      post: {
        title: '',
        category: '',
        price: null,
        price_offer_yn: false,
        description: '',
        place: '랜덤동',
        thumb_url: 'https://dummyimage.com/192x192/000/fff',
        // thumb_url:
        //   'http://mstatic1.e-himart.co.kr/contents/goods/00/03/53/78/59/0003537859__W43405B__1_640_640.jpg',
        chat_count: 0,
        favorate_count: 0,
        uid: ''
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    backToHome() {
      this.$router.push({ path: '/home' })
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
      console.log('createPost')
      console.log(this.post)
      const uid = this.$store.getters['user/userInfo'].uid
      console.log(uid)
      this.post.uid = uid

      await this.$postWithDatetime('posts', this.post)
      console.log(this.error)
      if (this.error === false) {
        this.$emit('toastShow', '게시글이 작성에 실패했습니다.')
      } else {
        this.$emit('toastShow', '게시글이 작성되었습니다.')
        this.$router.push({ path: '/home' })
      }
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
  border-radius: 14px;
  position: relative;
  top: 1px;
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
