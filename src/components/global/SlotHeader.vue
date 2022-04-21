<template>
  <header class="header">
    <div class="header__title">
      <slot name="title"></slot>
    </div>

    <div class="header__buttons">
      <slot name="buttons"></slot>
    </div>
  </header>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
<style></style>
