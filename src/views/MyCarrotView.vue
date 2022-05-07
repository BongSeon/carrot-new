<template>
  <div class="mycarrot" v-show="show">
    <slot-header>
      <template v-slot:title> 나의 당근 </template>
    </slot-header>
    <section class="first">
      <div class="my-info-wrap">
        <img class="my-avatar" :src="photoURL" alt="" />
        <div class="my-info">
          <h1 class="display-name">{{ displayName }}</h1>
          <p>{{ email }}</p>
        </div>
      </div>
      <button class="btn btn-primary btn-logout" @click="logout">
        로그아웃
      </button>
    </section>
    <section class="second">
      <button class="btn-list">
        <!-- 판매내역 -->
        <img src="@/assets/icons/list-btn-1.jpg" alt="" />
      </button>
      <button class="btn-list">
        <!-- 구매내역 -->
        <img src="@/assets/icons/list-btn-2.jpg" alt="" />
      </button>
      <button class="btn-list">
        <!-- 관심목록 -->
        <img src="@/assets/icons/list-btn-3.jpg" alt="" />
      </button>
    </section>
  </div>
</template>

<script>
import UseAuth from '@/mixins/useAuth.js'

export default {
  mixins: [UseAuth],
  components: {},
  data() {
    return { photoURL: '', displayName: '', email: '', uid: '', show: false }
  },
  setup() {},
  created() {
    setTimeout(() => {
      this.show = true
    }, 50)
  },
  async mounted() {
    const user = this.$store.getters['user/userInfo']
    console.log('user:', user)
    this.displayName = user.displayName
    this.email = user.email
    this.uid = user.uid
    this.photoURL = user.photoURL
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

<style></style>
