<script setup>

//@ts-nocheck
import ProductFilters from './Product-filters.vue';
import productsData from '../mock/products.json'
import { addMockDataToProduct } from '../hint/match';
import { requestProducts, requestProductNext } from '../hint/requests'
import { ref, computed, onMounted, onUpdated, onBeforeMount } from 'vue';


const productsMock = ref(productsData);

const limit = ref(30);
const counter = ref(1);
const products = ref([]);
const isProductLoaded = ref(false)

const sorting = ref('popular');
const options = ref([]);


const isLoadMoreHidden = ref(false);

const isCategoriesScrollHidden = ref(false);

console.log('Catalog-products setup')
console.log('products', products.value.length)

initProducts()


// fetch('https://dummyjson.com/products')
//     .then((res) => res.json())
//     .then((res) => {
//       console.log('fetch request from Catalog-product')
//       products.value = res.products;
//       addMockDataToProduct(productsMock.value, products.value)
//       isProductLoaded.value = true
//     })
//     .catch(console.log);


onBeforeMount(() => {
  console.log('Catalog-products onBeforeMounted')
})

onMounted(() => {
  console.log('Catalog-products onMounted')
});

onUpdated(() => {
  console.log('Catalog-product onUpdated')
  console.log('Update options value', options.value)
})

const productsFiltered = computed(() => {
  console.log('productFilter', options)
  return products.value;

  // if(options.value.maxPrice)

  // if (!filters.value.length) {
  //   return products.value;
  // }
  // const resArr = [];
  // products.value.forEach((item) => {
  //   filters.value.forEach((filter) => {
  //     if (typeof filter === 'string' && (filter === item.brand || filter === item.category) && !resArr.includes(item)) {
  //       resArr.push(item);
  //     }
  //     if (typeof filter !== 'string' && ((item.price >= filter.minValue && item.price <= filter.maxValue) && !resArr.includes(item))) {
  //       resArr.push(item);
  //     }
  //   });
  // });

  return resArr;
});

const productsSorted = computed(() => {
  console.log('productsSorted')
  console.log('sorting value', sorting.value)
  console.log('options value', options.value)
  const sorted = [...productsFiltered.value];
  
  if (sorting.value === 'popular') {
    return sorted;
  }

  if (sorting.value === 'cheap') {
    return sorted.sort((a, b) => a.price - b.price);
  }

  if (sorting.value === 'expensive') {
    return sorted.sort((a, b) => b.price - a.price);
  }
  return false;
});


const loadingProducts = async() => {
  const nextResult = await requestProductNext(counter.value, limit.value)
  counter.value += 1;
  products.value = products.value.concat(nextResult.products);
  isCategoriesScrollHidden.value = true;
  if (nextResult.limit < limit.value) {
    isLoadMoreHidden.value = true;
  }
  // fetch(`https://dummyjson.com/products?limit=${limit.value}&skip=${counter.value * limit.value}`)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log('fetch request from Loading more')
  //     counter.value += 1;
  //     products.value = products.value.concat(res.products);
  //     isCategoriesScrollHidden.value = true;
  //     if (res.limit < limit.value) {
  //       isLoadMoreHidden.value = true;
  //     }
  //   })
  //   .catch(console.log);
};

const setRouter = (product) => {
  const prefix = (product.mock) ? 'mock-' : ''
  return {
    name: 'product',
    params: {id: `${prefix}${product.id}`}
  }
}

async function initProducts() {
  products.value = await requestProducts()
  addMockDataToProduct(productsMock.value, products.value)
  isProductLoaded.value = true
}

</script>


<template>
  <div v-if="isProductLoaded" class="page-catalog container">

    <ProductFilters 
      v-model:sorting="sorting" 
      v-model:options="options" 
      :products
    ></ProductFilters>


    <section class="products-catalog">
      <h2 class="visially-hidden">
        Products catalog
      </h2>
      <ul class="products-catalog__list">
        <li
          v-for="item in productsSorted"
          :key="item.value"
          class="products-catalog__item"
        >
          <router-link
            class="products-catalog__link"  :to="setRouter(item)"
          >
            <img
              class="products-catalog__image"
              :src="item.images[0]"
              alt="image-first"
            >
            <h3 class="products-catalog__title">{{ item.title }}</h3>
            <p class="products-catalog__text">£{{ item.price }}</p>
          </router-link>
        </li>
      </ul>
      <!-- <div
        v-show="!filters.length && !isLoadMoreHidden"
        class="products-catalog__button-link-wrapper"
      > -->
      <div
        v-show="!isLoadMoreHidden"
        class="products-catalog__button-link-wrapper"
      >
        <a
          class="products-catalog__button-link"
          href="#"
          @click.prevent="loadingProducts"
        >Load more</a>
      </div>
    </section>
  </div>
  </template>
  
  <style scoped lang="scss">
  @import "../variables.scss";
  @import "../main.scss";
  .page-catalog {
  display: flex;

  .filters {
    flex-basis: 150px;
    margin-top: 48px;
    margin-left: 50px;
  }
}

@media screen and (max-width: 767px) {
  .page-catalog {
    display: block;
  }
}

  .visially-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    white-space: nowrap;
    border: 0;
  }
  
  .js-string-list {
    position: absolute;
    width: 120px;
    margin-bottom: 35px;
    margin-left: 95px;
    background-color: $background-third;
    text-align: start;
  }
  
  .js-hidden {
    display: none;
  }

  .products-catalog {
  max-width: 980px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__item {
    max-width: 305px;
    padding-top: 35px;
    padding-left: 20px;
  }

  &__link {
    color: $background-primary;
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

  &__image {
    width: 305px;
    height: 375px;
    object-fit: cover;
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
    margin-bottom: 40px;
    margin-left: auto;
    font-family: $font-secondary;
    color: $background-primary;
    background-color: $background-third;
  }
}
  
  .products-catalog__list {
    margin-bottom: 45px;
  }
  
  .accordion {
    color: #2a254b;
    font-family: $font-primary;
    cursor: default;
  }
  
  @media screen and (max-width: 767px) {
    .filters {
    &__list {
      display: none;
    }

    &__button-wrapper {
      display: flex;
      justify-content: center;
    }

    &__button-first {
      position: relative;
      width: 120px;
      height: 40px;
      margin-right: 16px;
      font-family: $font-secondary;
      font-size: 14px;
      color: $background-primary;
      background-color: $background-third;
    }
  }

  .filters__button-first::after {
    position: absolute;
    top: 12;
    width: 0;
    height: 0;
    margin-top: 5px;
    margin-left: 12px;
    content: '';
    border-color: #000 transparent transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0 5px;
  }

  .filters__button-second::after {
    position: absolute;
    top: 12;
    width: 0;
    height: 0;
    margin-top: 5px;
    margin-left: 12px;
    content: '';
    border-color: #000 transparent transparent transparent;
    border-style: solid;
    border-width: 8px 8px 0 8px;
  }
    .filters {
      &__accordion-wrapper {
        display: none;
        margin-right: 50px;
      }
  
      &__button-wrapper {
        display: block;
        margin-right: auto;
        margin-left: auto;
      }
  
      &__button-first {
        display: inline-block;
      }
  
      &__sorting {
        display: block;
        margin-top: 20px;
      }
    }
  
    .accordion {
      background-color: #eee;
      color: #2a254b;
      font-family: $font-primary;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      text-align: left;
      border: none;
      outline: none;
      transition: 0.4s;
    }

    .accordion--brands {
      padding-top: 20px;
    }

    .active-accordion {
      display: block;
    }

    .active,
    .accordion:hover {
      background-color: #ccc;
    }
    
    .panel {
      padding: 0 18px 20px;
      background-color: white;
      display: none;
      overflow: hidden;
  
      &.active {
        display: block;
      }
    }
    .panel--scroll {
      padding: 0 18px;
      background-color: white;
      display: none;
      overflow: hidden;
      width: 300px;
      max-height: 250px;
      overflow-y: scroll;
    }

    .products-catalog {
    &__image {
      width: 201px;
      height: 250px;
      object-fit: cover;
    }

    &__button-link-wrapper {
      display: block;
    }

    &__button-link {
      display: block;
      margin-right: 24px;
      margin-left: 24px;
    }
  }
  }
  </style>