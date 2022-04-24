<template>
  <div class="mycarrot-wrap">
    <slot-header>
      <template v-slot:title> 나의 당근 </template>
    </slot-header>
    <section class="first mycarrot">
      <div class="my-info-wrap">
        <img class="my-avatar" src="@/assets/my-avatar.jpg" alt="" />
        <div class="my-info">
          <h1 class="display-name">{{ displayName }}</h1>
          <p>{{ email }}</p>
        </div>
      </div>
    </section>
    <section class="">
      <button class="btn btn-primary" @click="logout">로그아웃</button>
    </section>
  </div>
</template>

<script>
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   updateProfile
// } from 'firebase/auth'
import UseAuth from '@/mixins/useAuth.js'
// import { getAuth } from 'firebase/auth'
export default {
  mixins: [UseAuth],
  components: {},
  data() {
    return { displayName: '', email: '' }
  },
  setup() {},
  created() {},
  async mounted() {
    const user = await this.$getCurrentUser()
    await console.log('user:', user)
    this.displayName = user.displayName
    this.email = user.email
  },
  unmounted() {},
  methods: {
    logout() {
      this.$logout()
      this.$store.commit('user/logout')
      this.$router.push({ path: '/login' })
    },
    logoutSuccess() {
      console.log('logoutSuccess')
    }
  }
}
</script>

<style scoped>
section {
  padding: 0;
  padding: 10px;
  /* background-color: antiquewhite; */
  margin-bottom: 10px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
}
section.first {
  border-top: 0;
}
h1 {
  margin: 0;
}
.my-avatar {
  border-radius: 50%;
  width: 60px;
}
.my-info-wrap {
  display: flex;
}
.my-info {
  padding-left: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
}
.my-info .display-name {
  font-family: 'SuncheonB';
  font-size: 18px;
}
</style>
