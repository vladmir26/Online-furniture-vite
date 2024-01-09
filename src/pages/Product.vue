<script setup>
import Header from '../components/Header.vue'
import ProductDetails from '../components/Product-details.vue'
import Products from '../components/Products.vue'
import Advantages from '../components/Advantages.vue'
import ProductSubscription from '../components/Product-subscription.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue'

const isFlagProducts = ref(false);
const isFlagAdvantages = ref(false)
</script>

<template>
<Header>
</Header>
<ProductDetails>
</ProductDetails>
<Products :headingProducts="isFlagProducts ? 'Our popular products' : 'You might also love these'"
          :textButton="isFlagProducts? 'View collection' : 'See collection'">
</Products>
<Advantages :cssClassLi="isFlagAdvantages ? 'advantages__item' : 'advantages__item-grey'"
            :isFlagDiv = true>
</Advantages>
<ProductSubscription>
</ProductSubscription>
<Footer>
</Footer>
</template>

<style lang="scss">
</style>