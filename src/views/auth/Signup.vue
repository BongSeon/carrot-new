<template>
  <div class="signup drawer full-screen">
    <form @submit.prevent="handleSignup">
      <div class="logo">
        <img class="circle" src="@/assets/img/dong.jpg" width="160" alt="" />
        <h1>가입을 환영합니다😀</h1>
        <p>지금 가입시 츄르 신상품 5종</p>
        <p>맛보기 샘플러를 발송해드립니다.</p>
      </div>
      <div class="input">
        <input
          class="input-text"
          placeholder="이메일"
          type="text"
          v-model.trim="email"
          @blur="checkEmail"
        />
        <p class="error-msg">{{ errorEmail }}</p>
        <input
          class="input-text"
          placeholder="패스워드"
          type="password"
          v-model.trim="password"
          @blur="checkPassword"
        />
        <p class="error-msg">{{ errorPassword }}</p>
        <input
          class="input-text"
          placeholder="닉네임"
          type="text"
          v-model.trim="displayName"
        />
        <p class="error-msg">{{ error }}</p>

        <btn-main :pending="pending" content="가입하기" />

        <p class="bottom-text">
          계정이 있으신가요?
          <span class="btn text-primary" @click="closeDrawer()">로그인</span>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import UseAuth from '@/mixins/useAuth.js'
export default {
  mixins: [UseAuth],
  components: {},
  data() {
    return {
      email: '',
      password: '',
      displayName: '',
      errorEmail: null,
      errorPassword: null,
      pending: false
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async handleSignup() {
      console.log('handleSignup')
      if (this.pending === true) {
        return
      }
      if (
        this.email === '' ||
        this.password === '' ||
        this.displayName === ''
      ) {
        this.error = '모든 항목을 입력해주세요'
        return
      }
      this.pending = true

      await this.$signup(this.email, this.password, this.displayName)
    },
    afterSignup(user) {
      if (this.error === null && this.user !== null) {
        this.pending = false
        this.$store.commit('user/setUser', {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL
        })
        console.log(user.displayName + '님 가입을 환영합니다!')
        this.$emit('toastShow', user.displayName + '님 가입을 환영합니다!')
        this.$router.push({ path: '/home' })
      }
      console.log('환영합니다!')
    },
    closeDrawer() {
      this.email = ''
      this.password = ''
      this.displayName = ''
      this.$emit('close')
    },
    checkEmail() {
      this.errorEmail = null
      if (this.email !== '') {
        const regexpEmail = /^([a-z]+\d*)+(\.?[a-z]*)+@[a-z]+(\.[a-z]{2,3})+$/
        if (!regexpEmail.test(this.email)) {
          this.errorEmail = '올바른 형식의 이메일을 입력해주세요.'
        }
      }
    },
    checkPassword() {
      this.errorPassword = null
      if (this.password !== '' && this.password.length < 6) {
        this.errorPassword = '비밀번호는 6자리 이상 입력해주세요.'
      }
    }
  }
}
</script>
<style scoped>
form {
  color: var(--color-black);
  padding: 0 30px;
}
.logo {
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  height: 50vh;
}
.bottom-text {
  font-size: 14px;
  color: var(--secondary);
  margin: 10px;
  text-align: center;
}
.error-msg {
  color: var(--warning);
  font-size: 14px;
  padding-left: 2px;
}
</style>
