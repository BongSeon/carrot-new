<template>
  <div class="detail drawer full-screen">
    <slot-header>
      <template v-slot:title>
        <button class="text-white" @click="$emit('back')">
          <i class="fas fa-arrow-left"></i>
        </button>
      </template>
    </slot-header>
    <!-- carousel  -->
    <Carousel />
  </div>
</template>
<script>
import Carousel from '@/components/Carousel.vue'
export default {
  components: { Carousel },
  data() {
    return {
      show: false
    }
  },
  setup() {},
  created() {},
  mounted() {
    console.log('mounted')

    // this.show = true
  },
  beforeUnmount() {
    console.log('console')
    this.show = false
  },
  unmounted() {},
  methods: {
    showStart() {},
    goHome() {}
  }
}
</script>
<style scoped>
.detail .header {
  border: 0;
  position: absolute;
  top: 0;
  z-index: 2;
}
</style>
