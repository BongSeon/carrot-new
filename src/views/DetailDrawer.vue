<template>
  <div class="detail drawer full-screen">
    <slot-header>
      <template v-slot:title>
        <button class="text-white" @click="close">
          <i class="fas fa-arrow-left"></i>
        </button>
      </template>
    </slot-header>
    <!-- carousel  -->
    <Carousel ref="carousel" />
  </div>
</template>
<script>
import drawer from '@/mixins/drawer.js'
import Carousel from '@/components/Carousel.vue'
export default {
  mixins: [drawer],
  components: { Carousel },
  props: {
    product: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      images: []
    }
  },
  setup() {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    async open(id) {
      this.$refs.carousel.open(id)
      this.showDrawer('.detail', '.home')
    },
    close() {
      this.$refs.carousel.close()
      this.closeDrawer('.detail', '.home')
    }
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
