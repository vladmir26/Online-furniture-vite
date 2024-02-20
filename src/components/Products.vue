<script setup>
//@ts-nocheck
const { headingProducts, textButton } = defineProps(['headingProducts', 'textButton'])
import { ref, computed } from 'vue'
import productsData from '../mock/products.json'

const products = ref(productsData);


const sortedProductsId = computed(() => {
  const filtered = products.value.filter(item => [5, 8, 9].includes(item.id));
  return filtered.sort((a, b) => {
    if (a.id === 5) return -1;
    if (b.id === 5) return 1;
    if (a.id === 9) return -1;
    if (b.id === 9) return 1;
    if (a.id === 8) return -1;
    if (b.id === 8) return 1;
    return 0;
  });
});
</script>

<template>
<section class="products container">
  <div class="container__white-wrapper">
    <h2 class="products__heading">{{ headingProducts }}</h2>
    <ul class="products__list">
      <li v-for="(item, index) in sortedProductsId" :key="index" 
          class="products__item" 
          :class="{'products__item': true,'products__item--wide': index === 0 }"
      >
        <router-link class="products__link" :to="{ name: 'product', params: { id: `mock-${item.id}` } }">
          <img сlass="products__image" :class="{'products__image' :true, 'products__image--wide': index === 0 }" :src="item.images" alt="image-fifth">
          <h3 class="products__title">{{ item.title }}</h3>
          <p class="products__text">£{{ item.price }}</p>
        </router-link>
      </li>
    </ul>
    <div class="products__button-link-wrapper">
        <a class="products__button-link" href="#">{{ textButton }}</a>
    </div>
    </div>
</section>
</template>

<style scoped lang="scss">
 @import "../variables.scss";
 @import "../main.scss";
 .products {
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    margin-top: 35px;
  }

  &__item {
    padding-left: 20px;
  }

  &__item:first-child {
    grid-column: 1/3;
    padding-left: 0;
  }

  &__link {
    color: $background-primary;
  }

  &__heading {
    font-size: 32px;
  }

  &__image {
    height: 375px;
    object-fit: cover;
  }

  &__image--wide {
    width: 630px;
  }

  &__title {
    padding-top: 24px;
    font-size: 20px;
  }

  &__text {
    padding-top: 8px;
    font-family: $font-secondary;
    font-size: 18px;
  }

  &__button-link-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 60px;
    text-align: center;
  }

  &__button-link {
    padding: 16px 32px;
    margin-top: 35px;
    margin-right: auto;
    margin-left: auto;
    font-family: $font-secondary;
    color: $background-primary;
    background-color: $background-third;
  }
}

@media screen and (max-width: 767px) {
  .products {
    &__list {
      display: flex;
      width: 100%;
      overflow-x: scroll;
    }

    &__item {
      flex-shrink: 0;
      width: 200px;
    }

    &__image {
      height: 251px;
    }

    &__button-link-wrapper {
      display: block;
    }

    &__button-link {
      display: block;
    }
  }
}
</style>