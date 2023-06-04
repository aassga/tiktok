<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-size: 16px;
  font-family: 'Roboto','Noto Sans SC', sans-serif;
  letter-spacing: 3px;
}
</style>
