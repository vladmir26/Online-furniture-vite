<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "../node_modules/scss-reset/reset";
@import "./variables.scss";
@import "./main.scss";
html {
  height: 100%;
  min-height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: $font-primary;
  color: $background-primary;
}
</style>
