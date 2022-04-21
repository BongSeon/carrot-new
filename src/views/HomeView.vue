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
          v-for="product in products"
          :key="product.id"
          @click="showDetail(product.id)"
          :product="product"
        />
      </main>
    </div>

    <!-- 상세 페이지 -->
    <detail @back="closeDetail" />
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import PlaceDropdown from '@/components/PlaceDropdown.vue'
import Detail from '@/views/Detail.vue'
import gsap from 'gsap'

export default {
  name: 'Home',
  components: {
    ProductCard,
    PlaceDropdown,
    Detail
  },
  props: {},
  data() {
    return {
      products: [
        {
          id: '2323',
          title: '잘키운 고양이 분양합니다 분양합니다 분양합니다',
          place: '명일제1동',
          price: '10,000원',
          timeago: '11분 전',
          chat_count: 2,
          favorate_count: 5,
          thumb_url:
            'https://firebasestorage.googleapis.com/v0/b/carrot-new.appspot.com/o/product-thumb-1.jpg?alt=media&token=073c9ea5-818b-4581-ba17-d7c81aa1c7a1'
        },
        {
          id: '2324',
          title: '잘키운 수컷 고양이 분양합니다',
          place: '명일제2동',
          price: '30,000원',
          timeago: '11분 전',
          chat_count: 1,
          favorate_count: 4,
          thumb_url:
            'https://firebasestorage.googleapis.com/v0/b/carrot-new.appspot.com/o/product-thumb-2.jpg?alt=media&token=e32988ae-0cc8-42d7-b834-5818e4c8daab'
        }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
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
    showDetail(id) {
      console.log(id)
      gsap.fromTo(
        '.detail',
        { transform: 'translateX(100vw)' },
        {
          transform: 'translateX(0vw)',
          ease: 'power1.out',
          duration: 0.3
        }
      )
      gsap.fromTo(
        ['.home'],
        { opacity: 1 },
        {
          opacity: 0.2,
          ease: 'power1.out',
          duration: 0.3
        }
      )
    },
    closeDetail() {
      gsap.fromTo(
        '.detail',
        { transform: 'translateX(0vw)' },
        {
          transform: 'translateX(100vw)',
          ease: 'power1.out',
          duration: 0.3
        }
      )
      gsap.fromTo(
        ['.home'],
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power1.out',
          duration: 0.1
        }
      )
    }
  }
}
</script>
<style scoped></style>
