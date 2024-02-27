<template>
  <section class="product-details container js-product-details">
    <div class="product-details__wrapper container__grey-wrapper">
      <div class="product-details__image-inner-wrapper">
        <img class="product-details__image" :src="productItem.image" alt="image">
      </div>
      <div class="product-details__description-inner-wrapper">
        <h1 class="product-details__heading">{{ productItem.title }}</h1>
        <p class="product-details__price-text">£{{ productItem.price }}</p>
        <h2 class="product-details__title">Product description</h2>
        <p class="product-details__description-text">
          A timeless design, with premium materials features as one of our most popular and iconic pieces.
          The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.
        </p>
        <h2 class="product-details__title">Dimensions</h2>
        <div class="product-details__table-wrapper">
          <dl class="product-details__table-inner-wrapper">
            <dt class="product-details__title-table">Height</dt>
            <dd class="product-details__text-table">110cm</dd>
          </dl>
          <dl class="product-details__table-inner-wrapper">
            <dt class="product-details__title-table">Width</dt>
            <dd class="product-details__text-table">75cm</dd>
          </dl>
          <dl class="product-details__table-inner-wrapper">
            <dt class="product-details__title-table">Depth</dt>
            <dd class="product-details__text-table">50cm</dd>
          </dl>
        </div>
        <form>
          <label class="product-details__title-text" for="product-quantity">Quantitity</label>
          <div class="product-details__input-wrapper">
            <button class="product-details__minus" type="button" @click="addMinus()">-</button>
            <input id="product-quantity" class="product-details__input" type="number" name="product-quantity"
              :value="count">
            <button class="product-details__plus" type="button" @click="addPlus()">+</button>
          </div>
          <div class="product-details__button-wrapper">
            <button class="product-details__button" type="button" @click.prevent="addCart()">Add to cart</button>
            <div class="product-details__button-link-wrapper">
              <button class="product-details__button-link" type="button">Save to favorites</button>
            </div>
          </div>
        </form>
        <dialog id="dialogBox">
          <section>
            <p>All products added to cart</p>
          </section>
          <footer>
            <a class="primary" href="/cart" @click.prevent="addCart()">Go to cart</a>
            <button type="button" class="secondary" @click.prevent="closeDialog()">Stay on this page</button>
          </footer>
        </dialog>
      </div>
    </div>
  </section>
</template>
  
<script>
//@ts-nocheck
import { ref, computed, onMounted, watch } from 'vue';
import { mapStores } from 'pinia';
import { useCountStore } from '../store';
import { useRoute } from 'vue-router';
import productsData from '../mock/products.json'



export default {
  setup() {
    const route = useRoute();
    //const productsMock = ref(productsData)
    const count = ref(1);
    const isModalActive = ref(false);
    const countStore = useCountStore();
    const productItem = ref('');
    const limitedCounter = computed(() => Math.max(count.value, 1), {
      onTrack(e) {
        // срабатывает, когда count.value отслеживается как зависимость
        debugger
      },
      onTrigger(e) {
        // срабатывает при изменении значения count.value
        debugger
      }
    });

    const addPlus = () => { count.value += 1; };
    const addMinus = () => { 
      count.value -= 1; 
      count.value = limitedCounter.value;
    };
    const addCart = () => { 
      const dialogBox = document.getElementById('dialogBox'); 
      dialogBox.showModal(); 
      countStore.addCount(count.value); 
      countStore.animationActive('6000'); 
  };

    const closeDialog = () => { 
      const dialogBox = document.getElementById('dialogBox'); 
      dialogBox.close(); 
    };

    //const productId = route.params.id;
    const loadingProductItem = async (id) => {
      return await fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
            return res;
        })
        .catch(console.log);
    };
    

    const getProduct = async(productId) => {
      const idParams = productId.split('-');
         console.log(idParams);
          if (idParams.length === 1) {
            return await loadingProductItem(idParams[0]).then(
              (product) => { 
                return {
                    'image': product.images[0],
                    'title': product.title,
                    'price': product.price,
                };
              }
            );
          } else {
            const productDataItem = productsData.find(product => product.id === Number(idParams[1]));
            console.log(productDataItem);
            return {
                    'image': productDataItem.images,
                    'title': productDataItem.title,
                    'price': productDataItem.price,
                };
          
          }
          
    }

    const initProductValue = () => {
      getProduct(route.params.id).then((product) => {
           productItem.value = product
        });
    }


    const handleShowModal = () => { };
      onMounted(() => { 
        initProductValue();
        const dialogBox = document.getElementById('dialogBox'); dialogBox.showModal = handleShowModal;
      });

      watch(() => route.params.id, () => {
        initProductValue();
    });

      
      return { productItem, productsData, count, isModalActive, addPlus, addMinus, addCart, closeDialog, ...mapStores(useCountStore) };

   },
}
</script>
  
<style lang="scss">
@import '../variables.scss';
@import '../main.scss';

.product-details {
  margin-top: 20px;

  &__wrapper {
    display: flex;
  }

  &__image-inner-wrapper {
    min-width: 607px;
  }

  &__image {
    aspect-ratio: 607/662;
  }

  &__description-inner-wrapper {
    max-width: 520px;
    padding-left: 67px;
  }

  &__heading {
    font-size: 36px;
  }

  &__price-text {
    position: relative;
    padding-bottom: 25px;
    margin-bottom: 25px;
    font-family: $font-secondary;
    font-size: 24px;
    border-bottom: 1px solid #ebe8f4;
  }

  &__description-text {
    padding-top: 15px;
    padding-bottom: 35px;
    font-family: $font-secondary;
  }

  &__title-table {
    font-size: 14px;
  }

  &__text-table {
    padding-top: 15px;
    font-family: $font-secondary;
  }

  &__table-wrapper {
    display: flex;
    margin-top: 25px;
    margin-bottom: 40px;
  }

  &__table-inner-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-right: 50px;
  }

  &__table-inner-wrapper::after {
    position: absolute;
    top: 25px;
    right: 50px;
    left: 50px;
    width: 35px;
    content: "";
    border: 1px solid #ebe8f4;
    transform: rotate(90deg);
  }

  &__input-wrapper {
    position: relative;
  }

  &__input {
    width: 122px;
    height: 46px;
    padding-left: 55px;
    margin-top: 10px;
    border: none;
  }

  &__plus {
    position: absolute;
    top: 22px;
    left: 95px;
    width: 25px;
    height: 22px;
    color: #ebe8f4;
    background-color: $color-primary;
  }

  &__minus {
    position: absolute;
    top: 22px;
    left: 5px;
    width: 25px;
    height: 22px;
    color: #ebe8f4;
    background-color: $color-primary;
  }

  &__button-wrapper {
    display: flex;
    margin-top: 50px;
  }

  &__button {
    width: 143px;
    height: 56px;
    margin-right: 16px;
    font-family: $font-secondary;
    color: $color-primary;
    background-color: $background-primary;
  }

  &__button:hover {
    color: $background-primary;
    background-color: $color-primary;
  }

  &__button-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 178px;
    height: 56px;
    font-family: $font-secondary;
    color: $background-primary;
    background-color: $color-primary;
    opacity: 1;
  }

  &__button-link:hover {
    color: $color-fourth;
  }

  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
  }

  &__modal-content {
    width: 100%;
    max-width: 800px;
    padding: 20px;
    margin: auto;
    margin-top: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: $background-third;
    border: 1px solid #888;
    transform: translateY(-50%);
  }

  &__modal-text {
    text-align: center;
  }

  &__modal-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__modal-button-link {
    width: 120px;
    height: 50px;
    margin-right: 16px;
    font-family: $font-secondary;
    color: $color-primary;
    background-color: $background-primary;
  }

  &__modal-button {
    width: 155px;
    height: 50px;
    font-family: $font-secondary;
    color: $background-primary;
    background-color: $color-primary;
  }
}

.input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}

.js-modal-active {
  z-index: 4;
}

.js-modal-active-animation {
  animation: modalFadeIn 0.5s ease forwards;
}

@keyframes modalFadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

html:has(dialog[open]:modal) {
  overflow: hidden;
}


#dialogBox {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  margin: auto;
  margin-top: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: $background-third;
  border: 1px solid #888;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  section {
    text-align: center;
  }

  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .primary {
    padding: 1rem 2rem;
    margin-right: 16px;
    font-family: 'Satoshi';
    color: #fff;
    background-color: #2a254b;
  }

  .secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 178px;
    height: 56px;
    font-family: 'Satoshi';
    opacity: 1;
  }
}</style>