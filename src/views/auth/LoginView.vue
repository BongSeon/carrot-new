<template>
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
          v-model="email"
        />
        <input
          class="input-text"
          placeholder="패스워드"
          type="password"
          v-model="password"
        />

        <button class="btn btn-main btn-primary">시작하기</button>
        <p class="bottom-text">
          계정이 없다면 만드세요
          <span
            class="btn text-primary"
            @click="showDrawer('.signup', '.login')"
            >가입하기</span
          >
        </p>
      </div>
    </form>
  </div>

  <!-- 가입창 -->
  <Signup @close-drawer="closeDrawer('.signup', '.login')" />
</template>

<script>
import Drawer from '@/mixins/drawer.js'
import Signup from '@/views/auth/Signup.vue'
export default {
  mixins: [Drawer],
  components: { Signup },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  setup() {},
  created() {},
  mounted() {
    console.log(this.$router)
  },
  unmounted() {},
  methods: {
    handleLogin() {
      // console.log('handlelogin')
      this.$store.commit('user/setUser', {
        name: 'aestas',
        email: 'aestas@gmail.com'
      })

      this.$router.push({ path: '/home' })
    },
    openSignup() {}
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
/* .btn-login {
  width: 100%;
  padding: 10px 8px;
  margin-top: 20px;
} */
.bottom-text {
  font-size: 14px;
  color: var(--secondary);
  margin: 10px;
  text-align: center;
}
</style>
