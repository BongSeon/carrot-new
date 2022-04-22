<template>
  <div class="home__wrap">
    <!-- 상세페이지 표시될때 페이드 아웃 -->
    <div class="home">
      <slot-header page="home">
        <template v-slot:title>
          <place-dropdown />
        </template>

        <template v-slot:buttons>
          <button class="btn-search" @click="clickHeaderBtn('btn-search')">
            <img
              class="header__buttons-icon"
              src="@/assets/icons/search-outline.svg"
              alt="search-icon"
            />
          </button>
          <button class="btn-menu" @click="clickHeaderBtn('btn-menu')">
            <img
              class="header__buttons-icon"
              src="@/assets/icons/menu-outline.svg"
              alt="menu-icon"
            />
          </button>
          <button class="btn-bell" @click="clickHeaderBtn('btn-bell')">
            <img
              class="header__buttons-icon"
              src="@/assets/icons/bell-outline.svg"
              alt="bell-icon"
            />
          </button>
        </template>
      </slot-header>
      <main class="main">
        <product-card
          v-for="(post, index) in posts"
          :key="post.id"
          @click="clickPostCard(post.id, index)"
          :product="post"
        />
      </main>
    </div>

    <!-- 상세 페이지 -->
    <detail-drawer ref="detail" :product="product" />
  </div>
</template>

<script>
import GetDocs from '@/mixins/getDocs.js'
import ProductCard from '@/components/ProductCard.vue'
import PlaceDropdown from '@/components/PlaceDropdown.vue'
import gsap from 'gsap'
import DetailDrawer from './DetailDrawer.vue'

export default {
  mixins: [GetDocs],
  components: {
    ProductCard,
    PlaceDropdown,
    DetailDrawer
  },
  props: {},
  data() {
    return {
      posts: [],
      product: {}
    }
  },
  setup() {},
  created() {},
  async mounted() {
    const docs = await this.$load('posts', 'created_datetime')
    this.posts = []
    docs.forEach((doc) => {
      this.posts.push({ ...doc, timeago: '0분전' })
    })
  },
  unmounted() {},
  methods: {
    clickHeaderBtn(btn) {
      gsap.fromTo(
        `.${btn}`,
        { scale: 0.8 },
        {
          scale: 1.0,
          ease: 'elastic.out(1, 0.4)',
          duration: 0.8
        }
      )
      console.log(btn + ' clicked')
    },
    async clickPostCard(id) {
      this.product = this.posts.filter((post) => {
        return post.id === id
      })[0]
      this.$refs.detail.open(id)
    }
  }
}
</script>
<style scoped></style>
