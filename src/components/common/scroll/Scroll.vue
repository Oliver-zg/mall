<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>  
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props:{
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      bs: null
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动的位置
    this.bs.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
    //监听上拉事件
    this.bs.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.bs && this.bs.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.bs && this.bs.finishPullUp()
    },
    refresh() {
      this.bs.refresh()
    }
  }
}
</script>

<style>

</style>