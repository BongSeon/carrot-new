<template>
  <nav id="nav" :class="{ show: show }">
    <div class="tabs d-flex">
      <div @click="tab('tab1', '/home')" class="tab tab1">
        <img class="tab__icon" src="@/assets/icons/1946488.png" alt="" />
        <div class="tab__text">홈</div>
      </div>
      <div @click="tab('tab2', '/life')" class="tab tab2">
        <img class="tab__icon" src="@/assets/icons/nav-location.png" alt="" />
        <div class="tab__text">동네생활</div>
      </div>
      <div @click="tab('tab3', '/chat')" class="tab tab3">
        <img class="tab__icon" src="@/assets/icons/nav-chat.png" alt="" />
        <div class="tab__text">채팅</div>
      </div>
      <div @click="tab('tab4', '/my')" class="tab tab4">
        <img class="tab__icon sm" src="@/assets/icons/nav-person.png" alt="" />
        <div class="tab__text">나의 당근</div>
      </div>
    </div>
  </nav>
</template>
<script>
import gsap from 'gsap'
export default {
  components: {},
  data() {
    return {
      show: true
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    tab(tabName, url) {
      gsap.fromTo(
        `.${tabName}`,
        { scale: 0.8 },
        {
          scale: 1.0,
          ease: 'elastic.out(1, 0.4)',
          duration: 0.8
        }
      )
      this.$router.push({ path: url })
    }
  }
}
</script>
<style scoped>
#nav {
  display: none;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  z-index: 0;
}
#nav a {
  color: #2c3e50;
  text-decoration: none;
  cursor: pointer;
}
#nav.show {
  display: block;
}
.tabs {
  height: 60px;
}
.tab__icon {
  align-self: center;
  height: 25px;
}
.tab__icon.sm {
  position: relative;
  top: 2px;
  height: 21px;
  margin-bottom: 2px;
}
.tab__text {
  padding-top: 3px;
  align-self: center;
  text-align: center;
  font-size: 12px;
}

.tab {
  padding-top: 10px;
  width: 25%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.tab:hover {
  background-color: var(--color-light-white);
}
</style>
