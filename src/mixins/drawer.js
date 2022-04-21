import gsap from 'gsap'

export default {
  methods: {
    mounted() {
      console.log('mixin에서 출력')
    },
    showDrawer(drawer, main) {
      gsap.fromTo(
        drawer,
        { transform: 'translateX(100vw)' },
        {
          transform: 'translateX(0vw)',
          ease: 'power1.out',
          duration: 0.3
        }
      )
      if (main) {
        gsap.fromTo(
          main,
          { transform: 'translateX(0vw)' },
          {
            transform: 'translateX(-100vw)',
            ease: 'power1.out',
            duration: 0.3
          }
        )
      }
    },
    closeDrawer(drawer, main) {
      gsap.fromTo(
        drawer,
        { transform: 'translateX(0vw)' },
        {
          transform: 'translateX(100vw)',
          ease: 'power1.out',
          duration: 0.3
        }
      )
      if (main) {
        gsap.fromTo(
          main,
          { transform: 'translateX(-100vw)' },
          {
            transform: 'translateX(0vw)',
            ease: 'power1.out',
            duration: 0.3
          }
        )
      }
    }
  }
}
