<script setup>
import Header from '../components/Header.vue'
import Brand from '../components/Brand.vue'
import Advantages from '../components/Advantages.vue'
import Ceramics from '../components/Ceramics.vue'
import Products from '../components/Products.vue'
import Subscription from '../components/Subscription.vue'
import BrandAbout from '../components/Brand-about.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue'


const isFlagProducts = ref(true);
const isFlagAdvantages = ref(true)
</script>

<template>
  <Header>
  </Header>
  <Brand>
  </Brand>
  <Advantages :cssClassLi="isFlagAdvantages ? 'advantages__item' : 'advantages__item-grey'"
              :isFlagDiv = false>
  </Advantages>
  <Ceramics>
  </Ceramics>
  <Products :headingProducts="isFlagProducts ? 'Our popular products' : 'You might also love these'"
            :textButton="isFlagProducts ? 'View collection' : 'See collection'">
  </Products>
  <Subscription>
  </Subscription>
  <BrandAbout>
  </BrandAbout>
  <Footer>
  </Footer>
</template>

<style scoped lang="scss">
</style>