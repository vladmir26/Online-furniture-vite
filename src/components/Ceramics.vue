<script setup>
//@ts-nocheck
import productsData from '../mock/products.json'
import { ref } from 'vue';


const products = ref(productsData);
</script>
<template>
<section class="ceramics container">
        <div class="container__white-wrapper">
          <h2 class="ceramics__heading">New ceramics</h2>
          <ul class="ceramics__list">
            <li
              v-for="(product, index) in products.slice(0, 4)" :key="(product.id, index)" 
              class="ceramics__item"
              >
              <router-link class="ceramics__link" :to="{ name: 'product', params: { id: `mock-${product.id}` } }">
                <img class="ceramics__image" :src="product.images" alt="image-first">
                <h3 class="ceramics__title">{{ product.title }}</h3>
                <p class="ceramics__text">£{{  product.price }}</p>
              </router-link>
            </li>
          </ul>
          <div class="ceramics__button-link-wrapper">
            <a class="ceramics__button-link" href="#">View collection</a>
          </div>
        </div>
      </section>
</template>

<style scoped lang="scss">
 @import "../variables.scss";
 @import "../main.scss";
 .ceramics {
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    margin-top: 35px;
  }

  &__item {
    padding-left: 20px;
  }

  &__item:first-child {
    padding-left: 0;
  }

  &__link {
    color: $background-primary;
  }

  &__heading {
    font-size: 32px;
  }

  &__image {
    width: 305px;
    height: 375px;
    object-fit: cover;
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
  .ceramics {
    &__list {
      grid-template-columns: repeat(2, 1fr);
    }

    &__item:nth-child(3) {
      padding-left: 0;
    }

    &__image {
      height: 201px;
      object-fit: cover;
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