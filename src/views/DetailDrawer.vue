<template>
  <div class="post-detail drawer full-screen">
    <div class="drawer-wrap">
      <i class="btn-back fas fa-arrow-left" @click="close"></i>

      <!-- 캐러셀 -->
      <Carousel ref="carousel" />

      <!-- 포스트 작성자 정보 -->
      <section class="post-writer">
        <div class="my-info-wrap">
          <img class="my-avatar" :src="postWriter.photo_url" alt="" />
          <div class="my-info">
            <h1 class="display-name">{{ postWriter.display_name }}</h1>
            <p class="place-main secondary">{{ postWriter.place_main }}</p>
          </div>
        </div>
        <div>매너온도: {{ postWriter.manner_temp }}</div>
      </section>

      <!-- 포스트 상세 내용 -->
      <section class="description">
        <div class="row title">{{ post.title }}</div>
        <div class="row secondary">
          <span class="category">{{ this.post.category }}</span> | 끌올{{
            this.post.timeago
          }}분전
        </div>
        <div class="row post-description">{{ this.post.description }}</div>
        <div class="row secondary">
          관심 {{ this.post.favorate_count }} | 채팅
          {{ this.post.chat_count }}
        </div>
      </section>
      <section class="trade">
        <div class="trade-wrap">
          <div class="heart">
            <i class="far fa-heart"></i>
          </div>
          <div class="price">
            <div class="row">가격 {{ this.post.price }}원</div>
            <div v-if="post.price_offer_yn">가격제안하기</div>
            <div v-else>가격제안불가</div>
          </div>
        </div>
        <div>
          <button class="btn btn-primary btn-begin-chat">
            채팅으로 거래하기
          </button>
        </div>
      </section>
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
    post: {
      type: Object,
      default: function () {
        return {}
      }
    },
    postWriter: {
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
      this.$showDrawer('.post-detail', '.home')
    },
    close() {
      this.$refs.carousel.close()
      this.$closeDrawer('.post-detail', '.home')
    }
  }
}
</script>
<style></style>
