<template>
  <div class="detail drawer full-screen">
    <!-- <button class="btn-back text-white" @click="close"> -->
    <i class="btn-back fas fa-arrow-left" @click="close"></i>
    <!-- </button> -->

    <!-- carousel  -->
    <Carousel ref="carousel" />
    <div class="details">
      <div class="row title">{{ this.product.title }}</div>
      <div class="row">
        {{ this.product.category }} - {{ this.product.timeago }}
      </div>
      <div class="row description">{{ this.product.description }}</div>
      <div class="row">
        관심 {{ this.product.favorate_count }} - 채팅
        {{ this.product.chat_count }}
      </div>
      <div class="row">가격 {{ this.product.price }}원</div>
      <div class="row">
        <div v-if="product.price_offer_yn">가격제안하기</div>
        <div v-else>가격제안불가</div>
        <button class="btn btn-primary">채팅으로 거래하기</button>
      </div>
    </div>
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
      this.$showDrawer('.detail', '.home')
    },
    close() {
      this.$refs.carousel.close()
      this.$closeDrawer('.detail', '.home')
    }
  }
}
</script>
<style scoped>
.details {
  padding: 10px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.description {
  margin: 10px 0;
}
</style>
