<template>
  <div class="login-wrap">
    <div class="login full-screen">
      <form @submit.prevent="handleLogin">
        <div class="logo">
          <img src="@/assets/img/logo.png" width="160" alt="" />
          <h1>고양마켓</h1>
          <p>나만 고양이 없나요?</p>
          <p>대한민국 1등 반려묘 용품 스토어</p>
          <p>고양마켓입니다.</p>
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
          <p class="error-msg">{{ error }}</p>

          <btn-main :pending="pending" content="시작하기" />

          <p class="bottom-text">
            계정이 없다면 만드세요
            <span class="btn text-primary" @click="openSignup()">가입하기</span>
          </p>
        </div>
      </form>
    </div>

    <!-- 가입창 -->
    <Signup @close="$closeDrawer('.signup', '.login')" />
  </div>
</template>

<script>
import Drawer from '@/mixins/drawer.js'
import useAuth from '@/mixins/useAuth.js'
import Signup from '@/views/auth/Signup.vue'
import Spinner from '@/components/global/Spinner.vue'

export default {
  mixins: [Drawer, useAuth],
  components: { Signup, Spinner },
  data() {
    return {
      email: '',
      password: '',
      errorEmail: null,
      errorPassword: null,
      pending: false
    }
  },
  setup() {},
  created() {},
  mounted() {
    console.log(this.$router)
  },
  unmounted() {},
  methods: {
    async handleLogin() {
      console.log('handleLogin')
      if (this.pending === true) {
        return
      }
      if (this.email === '') {
        this.errorEmail = '이메일을 입력해주세요'
        return
      }
      if (this.password === '') {
        this.errorPassword = '패스워드를 입력해주세요'
        return
      }
      this.checkEmail()
      this.checkPassword()
      if (this.errorEmail !== null || this.errorPassword !== null) {
        return
      }

      this.pending = true

      await this.$login(this.email, this.password)
      this.pending = false

      if (this.error === null && this.loggedUser !== null) {
        // console.log(this.loggedUser.displayName)
        // console.log(this.loggedUser.email)

        this.$store.commit('user/setUser', {
          displayName: this.loggedUser.displayName,
          email: this.loggedUser.email,
          uid: this.loggedUser.uid,
          photoURL: this.loggedUser.photoURL
        })
        this.$emit(
          'toastShow',
          this.loggedUser.displayName + '님 어서오세요. 환영합니다!'
        )
        this.$router.push({ path: '/home' })
      }
    },
    openSignup() {
      this.email = ''
      this.password = ''
      this.$showDrawer('.signup', '.login')
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
  height: 50vh;
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
