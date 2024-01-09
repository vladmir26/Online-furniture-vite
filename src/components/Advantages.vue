<script setup>
const { cssClassLi, isFlagDiv } = defineProps(['cssClassLi', 'isFlagDiv'])
import { ref  } from 'vue';
const listAdvantages = ref([
  {
    icon: '/src/img/icons/icon-delivery.svg',
    title: 'Next day as standard',
    text: 'Order before 3pm and get your order the next day as standard'

  },
  {
    icon: '/src/img/icons/icon-checkmark.svg',
    title: 'Made by true artisans',
    text: 'Handmade crafted goods made with real passion and craftmanship'

  },
  {
    icon: '/src/img/icons/icon-purchase.svg',
    title: 'Unbeatable prices',
    text: 'For our materials and quality you won’t find better prices anywhere'

  },
  {
    icon: '/src/img/icons/icon-sprout.svg',
    title: 'Recycled packaging',
    text: 'We use 100% recycled packaging to ensure our footprint is manageable'

  }
])
</script>

<template>
    <section class="advantages container">
              <div class="container__white-wrapper">
                <h2 class="advantages__heading">What makes our brand different</h2>
                <ul class="advantages__list"> 
                  <li v-if="isFlagDiv" v-for="(item, index) in listAdvantages" :key="index" :class="cssClassLi">
                    <div class="advantages__item-inner-wrapper">
                      <img :src="item.icon">
                      <h3 class="advantages__title">{{ item.title }}</h3>
                      <p class="advantages__text">{{ item.text }}</p>
                    </div>
                  </li>
                  <li v-else v-for="(item, i) in listAdvantages" :key="i" :class="cssClassLi">
                    <img :src="item.icon">
                    <h3 class="advantages__title">{{ item.title }}</h3>
                    <p class="advantages__text">{{ item.text }}</p>
                  </li>
                </ul>
              </div>
            </section>
</template>

<style scoped lang="scss">
@import "../variables.scss";
@import "../main.scss";
.advantages {
  &__list {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  &__item {
    width: 270px;
  }

  &__item-grey {
    max-width: 305px;
    margin-left: 22px;
    background-color: $background-third;
  }

  &__item-inner-wrapper {
    max-width: 100%;
    padding: 48px;
  }

  &__heading {
    font-size: 24px;
    text-align: center;
  }

  &__title {
    padding-top: 16px;
    font-size: 20px;
  }

  &__text {
    padding-top: 8px;
    font-family: $font-secondary;
  }
}

@media screen and (max-width: 767px) {
  .advantages {
    &__heading {
      text-align: start;
    }

    &__list {
      display: block;
    }

    &__item {
      padding-bottom: 35px;
    }

    &__item:last-child {
      padding-bottom: 0;
    }
  }
}
</style>