<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goodsItem="item" :key="index"></goods-list-item>
  </div>  
</template>

<script>
import GoodsListItem from './GoodsListItems'
export default {
  name: 'GoodsList',
  props: {
    goods:{
      type: Array,
      default() {
        return []
        }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style>
.goods {
  
  display: flex;
 /*  flex-direction: column; */
  justify-content: space-around;
 /*  align-items: center; */
  flex-wrap: wrap;
}

</style>