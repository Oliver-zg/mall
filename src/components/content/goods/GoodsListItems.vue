<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad()">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'GoodsListItems',
  props: {
    goodsItem: {
      type: Object,
      default() {
          return [];
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      if(this.$route.path.indexOf('/home')!=-1) {
        console.log('....');
        this.$bus.$emit('itemImgLoad')
      }else if(this.$route.path.indexOf('/detail')) {
        this.$bus.$emit('detailItemImgLoad')
      }
    },
    itemClick() {
      this.$router.push('/detail/'+ this.goodsItem.iid)
    }
  }
}
</script>

<style>
.goods-item {
  flex: 1;
  width: 48%;
  height: 280px;
  padding: 5px;
  margin-bottom: 8px;
  position: relative;
}
.goods-item img{
  width: 100%;
  height: 240px;
}
.goods-info {
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 50px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>