<script setup>
</script>

<template>
<section class="brand container">
  <div class="container__white-wrapper--brand">
    <div class="brand__block">
      <div class="brand__left-content"> 
        <h1 class="brand__heading"> The furniture brand for the future, with timeless designs</h1>
        <div class="brand__bottom-wrapper">
          <a class="brand__button-link" href="markup/pages/catalog.html">View collection</a>
          <p class="brand__text">
            A new era in eco friendly furniture with Avelon, the French luxury retail brandwith nice fonts, tasteful colors and a beautiful way to display things digitally 
            using modern web technologies.
          </p>
        </div>
      </div>
      <div class="brand__image-wrapper">
        <img class="brand__image" src="../img/content-image/image-first.png" alt="image-first"/>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped lang="scss">
  @import "../variables.scss";
  @import "../main.scss";
  .brand {
  &__block {
    display: flex;
    justify-content: space-between;
    min-height: 584px;
    background-color: $background-primary;
  }

  &__left-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 59.375%;
    padding: 60px;
    color: $color-primary;
  }

  &__bottom-wrapper {
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
  }

  &__heading {
    font-size: 32px;
  }

  &__button-link {
    width: 170px;
    min-height: 56px;
    padding: 16px 32px;
    margin-top: 40px;
    margin-bottom: auto;
    font-family: $font-secondary;
    font-size: 16px;
    color: $color-primary;
    background-color: $background-secondary;
    opacity: 1;
  }

  &__button-link:hover {
    color: $color-primary;
    opacity: 0.2;
  }

  &__text {
    font-family: $font-secondary;
    font-size: 18px;
  }

  &__image-wrapper {
    width: 40%;
  }

  &__image {
    display: block;
    height: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 767px) {
  .container {
    &__white-wrapper--brand {
      padding: 0;
    }
  }

  .brand {
    &__left-content {
      width: 100%;
      padding: 40px 25px 25px;
    }

    &__bottom-wrapper {
      display: flex;
      flex-basis: auto;
      flex-direction: column;
      justify-content: space-between;
    }

    &__text {
      order: 2;
    }

    &__button-link {
      order: 3;
      width: 100%;
      min-height: 0;
      margin-top: 30px;
      text-align: center;
      opacity: 1;
    }

    &__image-wrapper {
      display: none;
    }
  }
}
</style>