<template>
  <div class="place__dropdown" @click="togglePlaceModal">
    명일동
    <i class="header__title-icon fas fa-angle-down"></i>
  </div>

  <ModalPlace :show="placeOpen" :closing="closing" @close="closeAdnimaion" />
</template>
<script>
import ModalPlace from './ModalPlace.vue'
import gsap from 'gsap'
export default {
  components: { ModalPlace },
  data() {
    return {
      placeOpen: false,
      closing: false
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    togglePlaceModal() {
      this.placeOpen = !this.placeOpen
      gsap.to('.header__title-icon', {
        rotation: this.placeOpen ? '180deg' : '0deg',
        ease: 'powder1.out',
        duration: 0.3
      })
      gsap.fromTo(
        '.modal-content',
        {
          scale: 0
        },
        {
          scale: 1,
          ease: 'powder1.out',
          duration: 0.3
        }
      )
    },
    async closeAdnimaion() {
      this.closing = true
      gsap.to('.header__title-icon', {
        rotation: '0deg',
        ease: 'powder1.out',
        duration: 0.3
      })
      await gsap.to('.modal-content', {
        scale: 0,
        ease: 'powder1.out',
        duration: 0.3
      })
      this.placeOpen = false
      this.closing = false
    }
  }
}
</script>
<style scoped>
.place__dropdown {
  cursor: pointer;
}
</style>
