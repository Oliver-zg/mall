<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        <h3>购物街</h3>
      </div>
    </nav-bar>
    <tab-control :titles="titles" 
                 @item-click="getItem" 
                 @click="getGoods()" 
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>
    <scroll ref="scroll" 
            :probeType="3" 
            :pullUpLoad="true" 
            @scroll="scrollPosition"
            @pullingUp="pullingUp"  
            class="home-wrapper">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="titles" 
                   @item-click="getItem" 
                   @click="getGoods()" 
                   ref="tabControl2"
                   ></tab-control>
      <goods-list :goods="currentGoods" class="goods-list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop';
import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name: 'Home',
  components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list:[]},
        'new': {page: 0,list:[]},
        'sell': {page: 0,list:[]}
      },
      item:'pop',
      titles: [
        {
          citem: '流行',
          eitem: 'pop'
        },
        {
          citem: '新款',
          eitem: 'new'
        },
        {
          citem: '流行',
          eitem: 'sell'
        }
      ],
      isShow: false,
      tabOffsetTop:0,
      isTabFixed: false
    }
  },
  computed: {
    currentGoods(){
      return this.goods[this.item].list
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods(this.item);
  },
  mounted() {
    //防抖处理 不需要每张图片加载完都调用scroll的refresh
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //监听每张图片的加载是否完成
    this.$bus.$on('itemImgLoad',() => {
      refresh()
    })
    //拿到TabBar的位移量
    //所有组件都有一个属性$el:用于获取组件中的元素
    this.swiperImageLoad()
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = (this.goods[type].page) + 1 
      getHomeGoods(type,page).then(res => {
        // ... 对数组进行解构 一个一个存入
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1 
      })
    },
    getItem(item) {
      this.item = item.item
      this.$refs.tabControl1.currentIndex = item.index
      this.$refs.tabControl2.currentIndex = item.index
      this.getHomeGoods(item.item)
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    scrollPosition(pos) {
      //判断backTop是否显示
      this.isShow = -pos.y > 1000?true:false
      //tabControl是否吸顶  
      this.isTabFixed = (-pos.y) >  this.tabOffsetTop ? true:false

    },
    pullingUp() {
      this.getHomeGoods(this.item)
      this.$refs.scroll.finishPullUp()
    },
    swiperImageLoad() {
      //获得tabControl的位移
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.fixed {
  position: fixed;
  top: 44px;
  z-index: 10;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.home-nav {
  background-color: var(--color-tint);
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 50;
}
.home-nav h3 {
  color: aliceblue;
}
.tab-control {
  /* position: sticky; */
 
}
.home-wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .goods-list {

} */
</style>