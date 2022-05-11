<template>
  <div v-show="show" class="post-detail">
    <i class="btn-back fas fa-arrow-left" @click="close"></i>
    <i v-if="isMyPost" class="btn-delete fas fa-trash-alt" @click="trash"></i>

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
import useAuth from '@/mixins/useAuth.js'
import useDocs from '@/mixins/useDocs.js'
import Carousel from '@/components/Carousel.vue'
import useStorage from '@/mixins/useStorage.js'

export default {
  mixins: [useAuth, useDocs, useStorage],
  components: { Carousel },
  props: {},
  data() {
    return {
      show: false,
      id: null,
      images: [],
      post: {},
      postWriter: {},
      isMyPost: false, // 내가 작성한 글일 경우 true
      currentUser: null
    }
  },
  setup() {},
  created() {
    this.id = this.$route.params.id

    setTimeout(() => {
      this.show = true
    }, 50)
  },
  async mounted() {
    this.$refs.carousel.open(this.id)
    this.post = await this.$getDoc('posts', this.id)
    this.postWriter = await this.$getDoc('users', this.post.uid)

    try {
      const uid = this.$store.getters['user/userInfo'].uid
      // 내가 작성한 글일 경우 true
      if (this.post.uid === uid) {
        console.log('내가 작성한 글')
        this.isMyPost = true
      }
    } catch (error) {
      console.log(error)
      this.$router.push({ path: '/' })
    }
  },
  beforeUnmount() {},
  unmounted() {},
  methods: {
    close() {
      // this.$refs.carousel.close()
      this.$router.push({ path: '/home' })
    },
    async trash() {
      await this.$getCurrentUser()
      console.log(this.currentUser)

      if (window.confirm('정말 삭제하시겠습니까?')) {
        console.log('trash')
        const product_id = this.id

        // 1. storage/thumbnails 에서 삭제
        console.log(this.post.thumb_path)
        await this.$deleteFile(this.post.thumb_path)
        // this.$deleteFile(`thumbnails/${this.post.uid}/~~~`)

        // 3. firestore images 에서 product_id가 product_id인것들 모두 찾아서 삭제
        const images = await this.$getDocsWhere(
          'images',
          'product_id',
          product_id
        )
        // console.log(images)
        images.forEach((image) => {
          // 2. storage/products 에서 삭제
          console.log(image.file_path)
          //  await this.$deleteFile(`products/${this.post.uid}/~~~`)
          this.$deleteFile(image.file_path)

          console.log(image.id)
          this.$deleteDoc('images', image.id)
        })

        // 4. firestore posts 에서 삭제
        await this.$deleteDoc('posts', product_id)

        this.$emit('toastShow', '게시글이 삭제되었습니다.')
        this.$router.push({ path: '/home' })
      }
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
