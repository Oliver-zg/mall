<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @itemClick="itemClick"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <!-- 属性值有大写，应换成小写并用'-'连接， topImages => top-images -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info ref="" :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'

//公共组件
import GoodsList from 'components/content/goods/GoodsList'
import scroll from 'components/common/scroll/Scroll'

import {getGoodsDetail,getRecommend,Goods,Shop,GoodsParams} from 'network/detail.js'
import {debounce} from 'common/utils'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList

  },
  data() {
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopY:[]
    }
  },
  created() {
    this.iid = this.$route.params.id
    //请求详情数据
    getGoodsDetail(this.iid).then(res => {
      const data = res.data.result
      this.topImages = data.itemInfo.topImages
      //商品标题数据
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //店铺数据
      this.shop = new Shop(data.shopInfo);
      //商品详细信息
      this.detailInfo  = data.detailInfo
      //尺寸信息
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});

      if(data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //请求推荐数据
    getRecommend().then(res => {
      const data = res.data.data
      this.recommends = data.list
    })

  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //监听每张图片的加载是否完成
    this.$bus.$on('detailItemImgLoad',() => {
      refresh()
    })

    this.themeTopY.push(0)
    this.themeTopY.push(0)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    },
     itemClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 101;
  height: 100vh;
  background-color: #fff;
}
.detail-navbar {
  position: relative;
  z-index: 102;
  background-color: #fff;

}
.detail-scroll {
  height: calc(100% - 44px);
}
</style>