<script setup>
</script>

<template>
<section class="brand-about container">
        <div class="brand-about__wrapper">
          <div class="container__white-wrapper container__white-wrapper--brand-about">
            <div class="brand-about__left-content">
              <div class="brand-about__top-wrapper">
                <h2 class="brand-about__heading">From a studio in London to a global brand with over 400 outlets</h2>
                <p class="brand-about__text-primary">When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. </p>
                <p class="brand-about__text-secondary">Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>
                <a class="brand-about__button-link" href="#">Get in touch</a>
              </div>
            </div>
          </div>
          <div class="brand-about__image-wrapper"> 
            <img class="brand-about__image" src="../img/content-image/image-seventh.png" alt="image-seventh">
          </div>
        </div>
</section>
</template>

<style scoped lang="scss">
@import "../variables.scss";
@import "../main.scss";
.brand-about {
  &__wrapper {
    display: flex;
    min-height: 603px;
  }

  &__wrapper-reverse {
    display: flex;
    flex-direction: row-reverse;
    min-width: 720px;
    min-height: 520px;
  }

  &__left-content {
    height: 100%;
  }

  &__heading {
    font-size: 24px;
  }

  &__text-primary {
    padding-top: 25px;
    font-family: $font-secondary;
    color: #505977;
  }

  &__text-secondary {
    padding-top: 25px;
    margin-bottom: 50px;
    font-family: $font-secondary;
    color: #505977;
  }

  &__top-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
  }

  &__button-link {
    height: 56px;
    padding: 16px 32px;
    margin-top: auto;
    color: $background-primary;
    background-color: $background-third;
  }

  &__image-wrapper {
    width: 50%;
  }

  &__image {
    height: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 767px) {
  .container {
    &__white-wrapper--brand-about {
      width: 100%;
    }
  }
  .brand-about {
    &__wrapper {
      display: block;
    }

    &__left-content {
      width: 100%;
    }

    &__top-wrapper {
      padding: 0;
    }

    &__button-link {
      width: 100%;
      text-align: center;
    }

    &__image-wrapper {
      width: 100%;
    }
  }
}
</style>