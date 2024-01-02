<script setup>
import Header from '../components/Header.vue'
import Product from '../components/Product-details.vue'
import Products from '../components/Products.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue'

const isFlag = ref(false);
</script>

<template>
<Header>
</Header>
<Product>
</Product>
<Products :headingProducts="isFlag ? 'Our popular products' : 'You might also love these'"
          :textButton="isFlag? 'View collection' : 'See collection'">
</Products>
<Footer>
</Footer>
</template>

<style lang="scss">
</style>