<template>
  <div
    class="modal"
    :class="{ show: show, closing: closing }"
    tabindex="-1"
    @click="closeModal"
    @keyup.esc="closeModal"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      @click="handleDialogClick"
    >
      <div class="modal-content triangle-top">
        <p class="second__place">{{ secondPlace }}</p>
        <p class="current__place border-top">{{ currentPlace }}</p>
        <p class="place border-top">내 동네 설정하기</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    closing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // show: false,
      currentPlace: '명일동',
      secondPlace: '명일제1동'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    closeModal() {
      this.$emit('close')
    },
    handleDialogClick(event) {
      event.stopPropagation()
    }
  }
}
</script>
<style>
.modal.show {
  display: block;
}
.modal {
  display: none;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}
.modal.closing {
  background-color: transparent;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
  width: 200px;
  left: 6px;
  top: 35px;
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  transform-origin: top left;
}
.triangle-top:before {
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid #fff;
  position: absolute;
  left: 12%;
  top: -6px;
  transform: translateX(-7.5px);
}
.modal-content p {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  color: #888;
  font-weight: 500;
  font-size: 1rem;
}
.modal-content p.current__place {
  color: black;
}
.border-top {
  border-top: 1px solid #ddd;
}
</style>
