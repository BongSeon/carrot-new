<template>
  <div class="carousel-wrap">
    <div class="carousel">
      <div id="slider-div">
        <!-- <div
          class="carousel-item"
          :style="{
            backgroundImage:
              'url(' +
              'https://blog.kakaocdn.net/dn/F585W/btrp0JM1R42/Vh9vFKutQpiFsblY7RCzMK/img.png' +
              ')'
          }"
        ></div> -->
        <div class="carousel-item bg-gray">
          <div class="loader">Loading...</div>
        </div>
        <!-- <div
          v-for="img in images"
          :key="img.id"
          class="carousel-item"
          :style="{
            backgroundImage: 'url(' + img.url + ')'
          }"
        ></div> -->
      </div>
    </div>
  </div>
  <!-- <button
    style="margin-top: 100px"
    class="btn"
    @click="open('MDNxen2SHlKbyxLGJefN')"
  >
    test
  </button>
  <button
    style="margin-top: 100px"
    class="btn"
    @click="open('iwyiISZl5UbKBpHpEJIG')"
  >
    test
  </button>
  <button style="margin-top: 100px" class="btn" @click="close">close</button> -->
</template>
<script>
import GetDocs from '@/mixins/getDocs.js'
export default {
  mixins: [GetDocs],
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
      cnt: 1,
      inited: false
    }
  },
  computed: {
    // computedImgs() {
    //   return this.images
    // }
  },
  setup() {},
  created() {},
  mounted() {
    // this.inited = false
    // this.init()
  },
  unmounted() {
    $('#slider-div').slick('unslick')
    // this.inited = false
  },
  methods: {
    async open(id) {
      if (!this.inited) {
        this.inited = true
        this.init()
      }
      // console.log(id)
      this.images = await this.$loadImages('images', id, 'num')

      await this.images.forEach((img) => {
        const h =
          '<div class="carousel-item" style="background-image: url(' +
          img.url +
          ')"></div>'
        console.log(h)
        this.cnt++

        $('#slider-div').slick('slickAdd', h)
      })
      await console.log(this.cnt)

      $('#slider-div').slick('slickRemove', true)
      this.cnt--
    },
    init() {
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
          prevArrow:
            "<button type='button' class='slick-prev'>Previous</button>", // 이전 화살표 모양 설정
          nextArrow: "<button type='button' class='slick-next'>Next</button>", // 다음 화살표 모양 설정
          dotsClass: 'slick-dots', //아래 나오는 페이지네이션(점) css class 지정
          draggable: true //드래그 가능 여부
        })
      })
    },
    close() {
      setTimeout(() => {
        this.clear()
        $('#slider-div').slick(
          'slickAdd',
          '<div class="carousel-item bg-gray"><div class="loader">Loading...</div></div>'
        )
        this.cnt++
      }, 300)
    },
    clear() {
      for (let i = 0; i < this.cnt; i++) {
        console.log('remove')
        $('#slider-div').slick('slickRemove', false)
      }
      this.cnt = 0
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
