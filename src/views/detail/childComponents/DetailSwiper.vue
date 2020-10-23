<template>
  <div class="detail-swiper">
    <swiper class="ds">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImages:{
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper, 
    SwiperItem
  }

}
</script>

<style>
.ds {
  height: 300px;
}
/* .ds img {
  height: 12.5rem;
} */
</style>