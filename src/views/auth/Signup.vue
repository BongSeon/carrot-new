<template>
  <div class="signup drawer full-screen">
    <form @submit.prevent="handleLogin">
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
          v-model="email"
        />
        <input
          class="input-text"
          placeholder="패스워드"
          type="text"
          v-model="email"
        />

        <button class="btn btn-main btn-primary" @click="$emit('close-drawer')">
          가입하기
        </button>
        <p class="bottom-text">
          계정이 있으신가요?
          <span class="btn text-primary" @click="$emit('close-drawer')"
            >로그인</span
          >
        </p>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
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
</style>
