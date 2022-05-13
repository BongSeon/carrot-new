<template>
  <div class="home__wrap">
    <div class="home">
      <slot-header page="home">
        <template v-slot:left>
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

    <!-- 게시글 추가 버튼 -->
    <button @click="createPost" class="btn btn-create circle">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
import useDocs from '@/mixins/useDocs.js'
import ProductCard from '@/components/ProductCard.vue'
import PlaceDropdown from '@/components/PlaceDropdown.vue'
import gsap from 'gsap'

export default {
  mixins: [useDocs],
  components: {
    ProductCard,
    PlaceDropdown
    // DetailDrawer
  },
  props: {},
  data() {
    return {
      show: false,
      posts: []
    }
  },
  setup() {},
  created() {
    setTimeout(() => {
      this.show = true
    }, 50)
  },
  async mounted() {
    const docs = await this.$getDocs('posts', 'created_datetime')
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
      this.$router.push({ path: `/detail/${id}` })
    },
    createPost() {
      this.$router.push({ path: '/createpost' })
    }
  }
}
</script>
<style scoped>
.btn-create {
  background-color: var(--primary);
  width: 50px;
  height: 50px;
  color: white;
  font-size: 1.35rem;
  position: fixed;
  right: 14px;
  bottom: 74px;
  box-shadow: 2px 2px 8px rgb(0 0 0 / 30%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.home {
  margin-bottom: 90px;
}
</style>
