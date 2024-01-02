<script setup>
const { headingProducts, textButton } = defineProps(['headingProducts', 'textButton'])
import { ref } from 'vue'
const listProducts = ref([
  {
    image: '../img/content-image/image-fifth.png',
    title: 'The Poplar suede sofa',
    price: '£980'
  },
  {
    image: `../img/content-image/image-first.png`,
    title: 'The Dandy chair',
    price: '£250'
  },
  {
    image: '../img/content-image/image-first.png',
    title: 'The Dandy chair',
    price: '£250'
  }
  ])
</script>

<template>
<section class="products container">
  <div class="container__white-wrapper">
    <h2 class="products__heading">{{ headingProducts }}</h2>
    <ul class="products__list">
      <li v-for="(item, index) in listProducts" :key="index" class="products__item products__item--wide">
        <a class="products__link" href="#">
          <img :class="{ products__image, 'products__image--wide': index === 0 }" :src="item.image" alt="image-fifth">
          <h3 class="products__title">{{ item.title }}</h3>
          <p class="products__text">{{ item.price }}</p>
        </a>
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