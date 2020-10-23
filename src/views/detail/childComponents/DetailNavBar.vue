<template>
  <div>
    <nav-bar class="detail-nav-bar">
      <div slot="left" class="back"  @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail-nb-center">
        <div v-for="(item,index) in titles"
              :key="index"
             class="nav-bar-item" 
             :class="{isActive:currentIndex == index}"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick',index)
    },
    backClick() {
      this.$router.back()
    }
  }

}
</script>

<style scoped>
.detail-nb-center {
  display: flex;
  justify-content: space-around;
}
.isActive {
  color: var(--color-tint);
}

.back img {
  margin-top: 12px;
}
</style>>

