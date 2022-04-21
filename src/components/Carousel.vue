<template>
  <div class="carousel-wrap">
    <div class="carousel">
      <div id="slider-div">
        <div
          v-for="img in imgs"
          :key="img.id"
          class="carousel-item"
          :style="{
            backgroundImage: 'url(' + img.url + ')'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      active: 0,
      imgs: [
        {
          index: 0,
          url: 'http://cdn.ggilbo.com/news/photo/202108/863335_692949_158.png'
        },
        {
          index: 1,
          url: 'https://image.bada.io/files//upload/2021/08/13/4830497_6116631958615.webp'
        },
        {
          index: 2,
          url: 'https://cdn.clien.net/web/api/file/F01/11767462/b1d2ed28d85ba1.jpg?w=780&h=30000'
        }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {
    $(function () {
      $('#slider-div').slick({
        slide: 'div', //슬라이드 되어야 할 태그 ex) div, li
        infinite: false, //무한 반복 옵션
        slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
        slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
        speed: 300, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
        arrows: true, // 옆으로 이동하는 화살표 표시 여부
        dots: true, // 스크롤바 아래 점으로 페이지네이션 여부
        autoplay: false, // 자동 스크롤 사용 여부
        autoplaySpeed: 10000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
        pauseOnHover: true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
        vertical: false, // 세로 방향 슬라이드 옵션
        prevArrow: "<button type='button' class='slick-prev'>Previous</button>", // 이전 화살표 모양 설정
        nextArrow: "<button type='button' class='slick-next'>Next</button>", // 다음 화살표 모양 설정
        dotsClass: 'slick-dots', //아래 나오는 페이지네이션(점) css class 지정
        draggable: true //드래그 가능 여부
      })
    })
  },
  unmounted() {},
  methods: {
    change(index) {
      this.active = index
    },
    prev(n) {
      if (this.active > 0) {
        this.active -= 1
      }
    },
    next(n) {
      if (this.active < this.imgs.length - 1) {
        this.active += 1
      }
    }
  }
}
</script>
<style scoped>
/* --- carousel --- */
.carousel-wrap {
  background-color: white;
  width: 100%;
}
.carousel {
  position: relative;
}
.carousel-item {
  width: 100px;
  height: 35vh;
  background-size: cover;
  background-position: center;
}
.carousel .slick-dotted.slick-slider {
  margin-bottom: 0;
}
.carousel .slick-prev,
.carousel .slick-next {
  z-index: 1;
  width: 40px;
  height: 100%;
}
.carousel .slick-prev {
  left: 0;
}
.carousel .slick-next {
  right: 0;
}
.carousel .slick-prev:before,
.carousel .slick-next:before {
  color: rgba(255, 255, 255, 0);
  background-image: url('../assets/icons/slide-prev.svg');
  background-repeat: no-repeat;
}
.carousel .slick-next:before {
  background-image: url('../assets/icons/slide-next.svg');
}

.carousel .slick-dots {
  bottom: 5px;
}
.carousel .slick-dots li {
  margin: 0;
}
</style>
