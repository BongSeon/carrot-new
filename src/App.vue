<template>
  <router-view v-on:toastShow="handleT" />
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
    handleT() {
      console.log('handleT')
      this.$refs.toast.open('게시글이 작성되었습니다.')
    }
  }
}
</script>
