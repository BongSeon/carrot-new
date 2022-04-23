<template>
  <slot-header page="createpost">
    <template v-slot:title
      ><button><i @click="backToHome" class="fas fa-times"></i></button>중고거래
      글쓰기

      <button @click="createPost">완료</button>
    </template>
  </slot-header>
  <main class="createpost">
    <section>
      <div class="btn-pic">
        <img
          class="icon"
          src="@/assets/icons/camera-fill.svg"
          alt="bell-icon"
        />
        <span>0/10</span>
      </div>
    </section>
    <section>글제목</section>
    <section>카테고리 선택</section>
    <section>가격 - 가격제안 받기</section>
    <section>상세내용</section>
  </main>
</template>
<script>
import Spinner from '@/components/global/Spinner.vue'
export default {
  components: { Spinner },
  data() {
    return {}
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    backToHome() {
      this.$router.push({ path: '/home' })
    },
    createPost() {
      console.log('createPost')
    }
  }
}
</script>
<style scoped>
section {
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
}
.btn-pic {
  cursor: pointer;
  border: 1px solid var(--color-dark-white);
  border-radius: 4px;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn-pic img {
  width: 24px;
}
.btn-pic span {
  font-size: 14px;
}
</style>
