<template>
  <div class="category-drawer drawer full-screen">
    <slot-header>
      <template v-slot:left>
        <button class="btn-close" @click="closeDrawer">
          <i class="fas fa-arrow-left"></i>
        </button>
      </template>
      <template v-slot:center>카테고리 선택 </template>
    </slot-header>
    <main>
      <section
        v-for="category in categories"
        :key="category.id"
        @click="handleClick(category.name)"
      >
        {{ category.name }}
      </section>
    </main>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    categories: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {}
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    closeDrawer() {
      this.$emit('close')
    },
    handleClick(name) {
      this.$emit('select', name)
    }
  }
}
</script>

<style scoped>
section {
  cursor: pointer;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
}
</style>
