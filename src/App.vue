<template>
  <router-view />
  <Nav />
</template>
<script>
import Nav from "@/components/Nav.vue";
export default {
  components: {
    Nav,
  },
};
</script>
