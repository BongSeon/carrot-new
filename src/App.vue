<template>
  <transition :name="transitionName">
    <router-view v-on:toastShow="openToast" />
  </transition>
  <Nav />
  <Toast ref="toast" />
</template>
<script>
import Nav from '@/components/Nav.vue'
import Toast from '@/components/global/Toast.vue'
export default {
  components: {
    Nav,
    Toast
  },
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      console.log('from:' + from.name + '  to:' + to.name)
      if (to.meta.page == null || from.meta.page == null) {
        this.transitionName = 'fade'
      } else if (from.name === 'login' && to.name === 'home') {
        this.transitionName = 'fade'
      } else {
        this.transitionName = to.meta.page > from.meta.page ? 'next' : 'prev'
      }
      console.log(this.transitionName)
    }
  },
  methods: {
    openToast(message) {
      console.log(message)
      this.$refs.toast.open(message)
    }
  }
}
</script>
<style>
@keyframes leaveToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-25%);
    filter: brightness(0.5);
  }
}
@keyframes enterFromLeft {
  from {
    transform: translateX(-25%);
    filter: brightness(0.5);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes leaveToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(25%);
  }
}
@keyframes enterFromRight {
  from {
    transform: translateX(25%);
  }
  to {
    transform: translateX(0);
  }
}
/* 전환효과 (Slide) */
.next-leave-to {
  animation: leaveToLeft 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 0;
}
.next-enter-to {
  animation: enterFromRight 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}
.prev-leave-to {
  animation: leaveToRight 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}
.prev-enter-to {
  animation: enterFromLeft 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 0;
}
/* 전환효과 (Fade) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 20.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
