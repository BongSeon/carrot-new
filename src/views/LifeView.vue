<template>
  <div class="life-wrap">
    <slot-header page="life">
      <template v-slot:title>동네 생활</template>
    </slot-header>
    <main class="life">
      <div>
        <h1>동네 생활</h1>
        <p>명일동 근처의 게시글을 불러오는 중입니다..</p>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
