<template>
  <div class="toast" :class="{ show: show }">{{ toastMsg }}</div>
</template>

<script>
export default {
  data() {
    return {
      toastMsg: '',
      show: false
    }
  },
  methods: {
    open(msg) {
      this.toastMsg = msg
      this.show = true

      setTimeout(() => {
        this.show = false
      }, 1200)
    }
  }
}
</script>

<style scoped>
/* toast */
.toast {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 15px 20px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s, transform 0.5s;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  z-index: 2;
  font-weight: bold;
}
.toast.show {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 10px);
}
</style>
