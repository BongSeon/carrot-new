<template>
  <div v-show="show" class="chat-wrap">
    <slot-header page="chat">
      <template v-slot:title>채팅 목록</template>
    </slot-header>
    <main class="chat">
      <div>
        <h1>채팅 목록</h1>
        <p>채팅 목록을 불러오는 중입니다..</p>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return { show: false }
  },
  setup() {},
  created() {
    setTimeout(() => {
      this.show = true
    }, 50)
  },
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
