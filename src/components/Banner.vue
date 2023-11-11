<script setup>
</script>

<template>
<section class="banner">
  <div class="banner__splash container">
    <h1 class="banner__heading">All products</h1>
  </div>
</section>
</template>

<style scoped lang="scss">
@import "../variables.scss";
@import "../main.scss";
.banner {
  margin-top: 20px;
  background-image: url('../img/content-image/image-eight.png');
  background-size: cover;

  &__splash {
    display: flex;
    height: 209px;
  }

  &__heading {
    align-self: flex-end;
    padding-bottom: 36px;
    padding-left: 80px;
    font-size: 36px;
    color: $color-primary;
  }
}

@media screen and (max-width: 767px) {
  .banner {
    margin-top: 0;

    &__splash {
      justify-content: center;
    }

    &__heading {
      padding-top: 64px;
      padding-bottom: 32px;
    }
  }
}
</style>