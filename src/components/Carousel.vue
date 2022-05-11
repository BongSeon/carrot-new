<template>
  <div class="carousel-wrap">
    <div class="carousel">
      <div id="slider-div"></div>
    </div>
  </div>
</template>
<script>
import useDocs from '@/mixins/useDocs.js'
export default {
  mixins: [useDocs],
  components: {},
  props: {},
  data() {
    return {
      images: [
        {
          num: 1,
          url: '/img/slide-1.svg'
        },
        {
          num: 2,
          url: '/img/slide-2.svg'
        },
        {
          num: 3,
          url: '/img/slide-3.svg'
        }
      ],
      cnt: 1
    }
  },
  computed: {},
  setup() {},
  created() {},
  mounted() {},
  beforeUnmount() {
    console.log('beforeUnmount')
    this.clear()
  },
  unmounted() {},
  methods: {
    async open(id) {
      // post의 id를 전달받아
      // 해당 post의 이미지들을 images 컬렉션에서 로드하여
      // slick 슬라이더로 표시한다.

      this.init() // init slick

      // $(function () {
      //   $('#slider-div').slick('refresh')
      // })

      this.images = await this.$loadImages('images', id, 'num')

      await this.images.forEach((img) => {
        const h =
          '<div class="carousel-item" style="background-image: url(' +
          img.url +
          ')"></div>'
        // console.log(h)
        this.cnt++

        $('#slider-div').slick('slickAdd', h)
      })
      console.log(this.cnt)
    },
    init() {
      $(function () {
        $('#slider-div').not('.slick-initialized').slick({
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
          prevArrow:
            "<button type='button' class='slick-prev'>Previous</button>", // 이전 화살표 모양 설정
          nextArrow: "<button type='button' class='slick-next'>Next</button>", // 다음 화살표 모양 설정
          dotsClass: 'slick-dots', //아래 나오는 페이지네이션(점) css class 지정
          draggable: true //드래그 가능 여부
        })
      })
    },
    clear() {
      for (let i = 0; i < this.cnt; i++) {
        console.log('remove')
        $('#slider-div').slick('slickRemove', false)
      }
      this.cnt = 0
      $('#slider-div').slick('unslick')
    }
  }
}
</script>
<style>
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
  height: 350px;
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

@media (min-width: 576px) {
  .carousel-item {
    height: 420px;
  }
}
@media (min-width: 768px) {
  .carousel-item {
    height: 560px;
  }
}
</style>
