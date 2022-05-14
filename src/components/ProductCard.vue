<template>
  <article class="card">
    <div class="thumbnail">
      <img :src="product.thumb_url" alt="search-icon" />
    </div>
    <div class="info">
      <h2 class="info__title">{{ product.title }}</h2>
      <p class="info__placetime">{{ product.place }} · {{ product.timeago }}</p>
      <h2 class="info__price">{{ product.price }}원</h2>
      <p class="info__counts">
        <i class="far fa-comment"></i>{{ product.chat_count
        }}<i class="far fa-heart"></i>{{ product.favorate_count }}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.card {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 14px 0;
  display: flex;
  height: 128px;
  position: relative;
  cursor: pointer;
}
.card .info__title {
  font-size: 16px;
  margin: 0;
}
.card:first-child {
  border-top: 0;
  margin-top: 0;
}
.thumbnail {
  height: 100%;
}
.thumbnail img {
  height: 100%;
  border-radius: 6px;
}
.info {
  width: 100%;
  position: relative;
  padding-left: 10px;
}
.info__placetime {
  color: grey;
  font-size: 12px;
  margin: 0;
  padding-top: 3px;
}
.info__price {
  padding-top: 2px;
  font-weight: 600;
  font-size: 18px;
}
.info__counts {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 14px;
  color: grey;
}
.info__counts i {
  padding: 0 0.1rem;
}
</style>
