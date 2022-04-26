<template>
  <div class="mycarrot-wrap">
    <slot-header>
      <template v-slot:title> 나의 당근 </template>
    </slot-header>
    <section class="first mycarrot">
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
    return { photoURL: '', displayName: '', email: '', uid: '' }
  },
  setup() {},
  created() {},
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section.second {
  display: flex;
  justify-content: space-evenly;
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
.btn-logout {
  height: 38px;
}

.btn-list {
  background-color: transparent;
}
.btn-list img {
  width: 72px;
  /* height: 75px; */
}
</style>
