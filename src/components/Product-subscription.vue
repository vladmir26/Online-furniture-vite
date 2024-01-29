<script setup>
//@ts-nocheck
</script>

<template>
<section class="product-subscription">
    <div class="product-subscription__wrapper">
        <div class="product-subscription__image-wrapper"> 
          <img class="product-subscription__image" src="../img/content-image/image-fiftteen.png" alt="image-fiftteen" />
        </div>
        <div class="container__white-wrapper--product-subscription">
            <div class="product-subscription__right-wrapper">
                <h2 class="product-subscription__heading">Join the club and get the benefits</h2>
                <p class="product-subscription__text">Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
                <form class="product-subscription__form" action="">
                    <input class="product-subscription__input" type="email" placeholder="your@email.com" required="required" />
                    <button class="product-subscription__button" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped lang="scss">
@import "../variables.scss";
@import "../main.scss";
.product-subscription {
  &__wrapper {
    display: flex;
  }

  &__right-wrapper {
    display: flex;
    flex-direction: column;
    min-width: 500px;
    height: 100%;
  }

  &__heading {
    padding-bottom: 20px;
    font-size: 32px;
  }

  &__text {
    font-family: $font-secondary;
  }

  &__form {
    margin-top: auto;
    white-space: nowrap;
  }

  &__input {
    width: 100%;
    max-width: 354px;
    height: 56px;
    padding-right: 30px;
    padding-left: 30px;
    background-color: $background-third;
    border: 2px solid $background-third;
  }

  &__input::placeholder {
    color: $background-primary;
    opacity: 0.2;
  }

  &__button {
    height: 56px;
    padding: 16px 32px;
    font-family: $font-secondary;
    color: $color-primary;
    background-color: $background-primary;
    border: $background-primary;
  }

  &__image-wrapper {
    width: 50%;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>