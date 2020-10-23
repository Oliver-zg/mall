<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :key="item.eitem" 
    :class="{active:index == currentIndex}" @click="itemClick(index,item.eitem)">
      <span>{{item.citem}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }

  },
  methods: {
    itemClick(index,item) {
       this.currentIndex = index
       this.$emit('item-click',{item:item,index:index});
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.active {
  color: var(--color-tint);
  border-bottom: 2px solid var(--color-tint);
}
</style>