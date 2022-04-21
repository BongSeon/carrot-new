<template>
  <slot-header page="home">
    <template v-slot:title> 나의 당근 </template>
  </slot-header>
  <main class="main mycarrot">
    <img class="my-avatar" src="@/assets/my-avatar.jpg" alt="" />
    <div class="my-info">
      <h1>Aestas</h1>
      <p>명일동 #12345</p>
      <button class="btn btn-primary" @click="logout">로그아웃</button>
    </div>
  </main>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    logout() {
      this.$store.commit('user/logout')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.my-avatar {
  border-radius: 50%;
  width: 60px;
}
.my-info {
  display: inline-block;
}
</style>
