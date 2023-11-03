<script setup>
import { RouterView } from 'vue-router'
import Main from './Main.vue'
</script>

<template>
 <Main>
  <RouterView></RouterView>
 </Main>
</template>

<style lang="scss">
@import "../node_modules/scss-reset/reset";
@import "./variables.scss";
body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: $font-primary;
  color: $background-primary;
}
</style>
