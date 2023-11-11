<script setup>
import { ref } from 'vue';

const isLoading = ref(false);
const showConfirmation = ref(false);

const submitForm = () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    showConfirmation.value = true;
  }, 10000);
}
</script>

<template>
<section class="subscription container">
        <div class="container__white-wrapper--color">
          <div class="container__white-wrapper">
            <div class="subscription__inner-wrapper">
              <h2 class="subscription__heading">Join the club and get the benefits</h2>
              <p class="subscription__text">Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
            </div>
            <form class="subscription__form" @submit.prevent="submitForm">
              <input class="subscription__input" type="email" placeholder="your@email.com" required="required">
              <button class="subscription__button" id="button" type="submit">
                <font-awesome-icon class="subscription__icon" icon="fa fa-spinner fa-spin" v-if="isLoading" spin/>
                <span v-else>Sign up</span>
              </button>
              <div v-if="showConfirmation" class="window">Спасибо за заявку</div>
            </form>
          </div>
        </div>
      </section>
</template>

<style scoped lang="scss">
 @import "../variables.scss";
 @import "../main.scss";
 .subscription {
  &__inner-wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  &__heading {
    font-size: 36px;
  }

  &__text {
    max-width: 470px;
    padding-top: 16px;
    margin-right: auto;
    margin-left: auto;
    font-family: $font-secondary;
  }

  &__form {
    margin-top: 70px;
    text-align: center;
  }

  &__input {
    width: 354px;
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

  &__icon {
    color: #fff;
  }

}

@media screen and (max-width: 767px) {
  .container {
    &__white-wrapper--color {
      padding: 0;
    }
  }

  .subscription {
    &__input {
      max-width: 224px;
      max-height: 56px;
    }

    &__button {
      max-width: 118px;
      max-height: 56px;
    }
  }
}
</style>