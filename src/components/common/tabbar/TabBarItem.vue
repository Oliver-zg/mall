<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle" class="item-text">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor:{
      type: String,
      default: '#d4237a'
    }
  },
  data() {
    return {
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive?{color:this.activeColor}:{};
    }
  },
  methods: {
     itemClick() {
       this.$router.push(this.path);
     }
  }
}
</script>

<style>
.tab-bar-item {
  text-align: center;
  font-size: 14px;
  margin-top: 3px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.item-text {
  margin-top: 5px;
}
/* .active {
  color: #d4237a;
} */
</style>