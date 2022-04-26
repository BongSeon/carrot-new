<template>
  <button class="btn btn-main btn-primary" :class="{ pending: pending }">
    <span v-if="pending"><spinner /></span>
    <span v-else>{{ content }}</span>
  </button>
</template>

<script>
export default {
  props: {
    content: { type: String, default: 'Click Me' },
    pending: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.btn .loader {
  transform: scale(0.3);
  top: 0;
}
</style>
