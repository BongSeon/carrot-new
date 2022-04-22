<template>
  <div class="detail">
    <slot-header>
      <template v-slot:title></template>
    </slot-header>
    <!-- carousel  -->
    <Carousel :images="images" ref="carousel" />
  </div>
</template>
<script>
import GetDocs from '@/mixins/getDocs.js'
import Carousel from '@/components/Carousel.vue'
export default {
  mixins: [GetDocs],
  components: { Carousel },
  props: {
    id: {
      type: String,
      required: true
    },
    product: {
      type: Object,
      default: function () {
        return {}
      }
    }
    // images: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      images: []
    }
  },
  setup() {},
  created() {
    // console.log('created detail')
  },
  async mounted() {
    // console.log('mounted detail')
    this.images = await this.$loadImages('images', this.id, 'num')
    $(function () {
      $('#slider-div').slick('refresh')
    })
    // console.log(this.images)
  },
  beforeUnmount() {},
  unmounted() {},
  methods: {
    // async open(id) {
    //   this.$refs.carousel.change(this.images)
    //   this.showDrawer('.detail', '.home')
    // },
    // close() {
    //   this.closeDrawer('.detail', '.home')
    // }
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
