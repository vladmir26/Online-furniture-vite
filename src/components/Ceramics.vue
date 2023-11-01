<script setup>
</script>

<template>
<section class="ceramics container">
        <div class="container__white-wrapper">
          <h2 class="ceramics__heading">New ceramics</h2>
          <ul class="ceramics__list">
            <li class="ceramics__item"><a class="ceramics__link" href="markup/pages/product.html"><img class="ceramics__image" src="../img/content-image/image-first.png" alt="image-first">
                <h3 class="ceramics__title">The Dandy chair</h3>
                <p class="ceramics__text">£250</p></a></li>
            <li class="ceramics__item"><a class="ceramics__link" href="#"><img class="ceramics__image" src="../img/content-image/image-second.png" alt="image-second">
                <h3 class="ceramics__title">Rustic Vase Set</h3>
                <p class="ceramics__text">£155</p></a></li>
            <li class="ceramics__item"><a class="ceramics__link" href="#"><img class="ceramics__image" src="../img/content-image/image-third.png" alt="image-third">
                <h3 class="ceramics__title">The Silky Vase</h3>
                <p class="ceramics__text">£125</p></a></li>
            <li class="ceramics__item"><a class="ceramics__link" href="#"><img class="ceramics__image" src="../img/content-image/image-fourth.png" alt="image-fourth">
                <h3 class="ceramics__title">The Lucy Lamp</h3>
                <p class="ceramics__text">£399</p></a></li>
          </ul>
          <div class="ceramics__button-link-wrapper"><a class="ceramics__button-link" href="#">View collection</a></div>
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