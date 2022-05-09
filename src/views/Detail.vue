<template>
  <div v-show="show" class="post-detail">
    <i class="btn-back fas fa-arrow-left" @click="close"></i>
    <i class="btn-delete fas fa-trash-alt" @click="trash"></i>

    <!-- carousel  -->
    <Carousel :images="images" ref="carousel" />

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
</template>
<script>
import GetDocs from '@/mixins/getDocs.js'
import Carousel from '@/components/Carousel.vue'
import useStorage from '@/mixins/useStorage.js'

export default {
  mixins: [GetDocs, useStorage],
  components: { Carousel },
  props: {},
  data() {
    return { show: false, id: null, images: [], post: {}, postWriter: {} }
  },
  setup() {},
  created() {
    // console.log('created detail')
    this.id = this.$route.params.id
    console.log(this.id)

    setTimeout(() => {
      this.show = true
    }, 50)
  },
  async mounted() {
    this.$refs.carousel.open(this.id)
    this.post = await this.$getDoc('posts', this.id)
    this.postWriter = await this.$getDoc('users', this.post.uid)
    console.log(this.postWriter)
  },
  beforeUnmount() {},
  unmounted() {},
  methods: {
    close() {
      // this.$refs.carousel.close()
      this.$router.push({ path: '/home' })
    },
    async trash() {
      console.log('trash')
      this.$delete('products/2WZiX994HJQti0orknoFJRYfMln1/fence.JPG')
      // this.$delete('product-thumb-1.jpg')
    }
  }
}
</script>
<style>
.post-detail .secondary {
  font-size: 14px;
  color: var(--color-light-grey);
}

.post-detail section.post-writer {
  padding: 14px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: antiquewhite; */
  margin-bottom: 10px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}
.post-detail .post-writer .my-avatar {
  border-radius: 50%;
  width: 50px;
}
.post-detail .post-writer .my-info-wrap {
  display: flex;
}
.post-detail .post-writer .my-info {
  padding-left: 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.post-detail .post-writer .display-name {
  margin: 0;
  font-family: 'SuncheonB';
  font-size: 20px;
}
.post-detail .post-writer .place-main {
  margin: 0;
}

.post-detail section.description {
  padding: 14px 10px;
}
.post-detail section.description .title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 14px;
}
.post-detail .category {
  text-decoration: underline;
}
.post-detail .post-description {
  margin: 16px 0;
}

.post-detail section.trade {
  /* padding: 14px 10px; */
  background-color: cornsilk;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 1111;
}
.post-detail .trade-wrap {
  display: flex;
}
.post-detail .fa-heart {
  margin-left: 15px;
  padding-right: 15px;
  font-size: 22px;
  line-height: 37px;
  color: var(--color-light-grey);
  border-right: 1px solid var(--color-dark-white);
}
.post-detail .price {
  padding-left: 15px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.post-detail .btn-begin-chat {
  margin-right: 15px;
}

.post-detail .btn-delete {
  cursor: pointer;
  position: fixed;
  color: white;
  background-color: transparent;
  top: 0;
  z-index: 2;
  font-size: 20px;
  right: 8px;
  top: 8px;
  padding: 4px;
}
</style>
