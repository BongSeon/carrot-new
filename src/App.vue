<template>
  <router-view v-on:toastShow="openToast" />
  <Nav />
  <Toast ref="toast" />
</template>
<script>
import Nav from '@/components/Nav.vue'
import Toast from '@/components/global/Toast.vue'
export default {
  components: {
    Nav,
    Toast
  },
  methods: {
    openToast(message) {
      console.log(message)
      this.$refs.toast.open(message)
    }
  }
}
</script>
