<template>
  <header class="header">
    <div class="header__left">
      <slot name="left"></slot>
    </div>

    <div class="header__center">
      <slot name="center"></slot>
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
<style>
.header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  height: 48px;
  display: flex;
  padding-left: 10px;
  padding-right: 6px;
  justify-content: space-between;
  align-items: center;
}
.header button {
  background-color: transparent;
}
.header__left,
.header__center {
  font-size: 20px;
  font-weight: bold;
}
.header__left,
.header__center,
.header__buttons {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header__buttons {
  min-width: 20px;
  display: flex;
  justify-content: flex-end;
}
.header__buttons button {
  border: 0;
  cursor: pointer;
  height: 26px;
  padding: 0 6px;
  margin: 0;
  cursor: pointer;
}
.header__buttons-icon {
  width: 26px;
}
.header__buttons-icon:hover {
  transform: scale(1.08);
}
</style>
