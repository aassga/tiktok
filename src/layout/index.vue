<template>
  <div class="main-content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="關注中" name="following"><following :tabIndex="tabIndex"/></el-tab-pane>
      <el-tab-pane label="為您推薦" name="forYou"><forYou :tabIndex="tabIndex" /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import following from "./../views/following.vue";
import forYou from "./../views/forYou.vue";

export default {
  data() {
    return {
      tabIndex:0,
      activeName:"following"
    }
  },
  components: {
    following,
    forYou
  },
  created() {

  },
  methods: {
    handleClick(tab) {
      this.tabIndex = tab.index;
    }
  },
}
</script>

<style lang="scss">
.el{
  &-tabs{
    &__header{
      width: 100%;
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed !important;
      z-index: 4;

    }
    &__item{
      font-size: 18px !important;
      color: #FFFFFF99 !important;
      text-decoration: none !important;
      font-weight: 700 !important;
      &.is-active{
        color: #FFFFFF !important;
      }
      &.is-top{
        &:last-child{
          border-left: 1px solid #FFFFFF;
        }
      }
    }
    &__nav{
      &-wrap{
        &::after{
          display: none;
        }
      }
    }
    &__active{
      &-bar{
        display: none;
      }
    }
  }
}
</style>
