<script setup>
//@ts-nocheck
import productsData from '../mock/products.json'
import { addMockDataToProduct } from '../hint/match';
import { ref, computed, onMounted } from 'vue';




const productsMock = ref(productsData);

const limit = ref(30);
const counter = ref(1);
const products = ref([]);
const categories = ref([]);
const brands = ref([]);
const maxPrice = ref(0);
const filters = ref([]);
const sorting = ref('popular');
const isLoadMoreHidden = ref(false);
const isFiltersAccordionHidden = ref(false);
const isCategoriesScrollHidden = ref(false);
const filtersAccordionStatus = ref({
  categories: false,
  price: false,
  brands: false,
});

const oneThirdPrice = computed(() => Math.ceil(maxPrice.value / 3));

const priceRange = computed(() => [
  {
    id: 1,
    name: `0 - ${oneThirdPrice.value}`,
    minValue: 0,
    maxValue: oneThirdPrice.value,
  },
  {
    id: 2,
    name: `${oneThirdPrice.value + 1} - ${oneThirdPrice.value * 2}`,
    minValue: oneThirdPrice.value + 1,
    maxValue: oneThirdPrice.value * 2,
  },
  {
    id: 3,
    name: `${oneThirdPrice.value * 2 + 1} - ${maxPrice.value}`,
    minValue: oneThirdPrice.value * 2 + 1,
    maxValue: maxPrice.value,
  },
]);

const productsFiltered = computed(() => {
  if (!filters.value.length) {
    return products.value;
  }
  const resArr = [];
  products.value.forEach((item) => {
    filters.value.forEach((filter) => {
      if (typeof filter === 'string' && (filter === item.brand || filter === item.category) && !resArr.includes(item)) {
        resArr.push(item);
      }
      if (typeof filter !== 'string' && ((item.price >= filter.minValue && item.price <= filter.maxValue) && !resArr.includes(item))) {
        resArr.push(item);
      }
    });
  });

  return resArr;
});

const productsSorted = computed(() => {
  const sorted = [...productsFiltered.value];
  if (sorting.value === 'popular') {
    return productsFiltered.value;
  }

  if (sorting.value === 'cheap') {
    return sorted.sort((a, b) => a.price - b.price);
  }

  if (sorting.value === 'expensive') {
    return sorted.sort((a, b) => b.price - a.price);
  }
  return false;
});

const appearanceAccordion = () => {
  isFiltersAccordionHidden.value = !isFiltersAccordionHidden.value;
};

const filtersAccordion = (event) => {
  const filterName = event.target.innerText.toLowerCase();
  filtersAccordionStatus.value[filterName] = !filtersAccordionStatus.value[filterName];
};

const createFilters = () => {
  products.value.forEach((product) => {
    if (!categories.value.includes(product.category)) {
      categories.value.push(product.category);
    }
    if (!brands.value.includes(product.brand)) {
      brands.value.push(product.brand);
    }
    maxPrice.value = product.price > maxPrice.value ? product.price : maxPrice.value;
  });
};

const filterItems = (event) => {
  if (event.target.checked) {
    if (event.target.name === 'price') {
      filters.value.push(priceRange.value.find((price) => price.id === +event.target.value));
    } else {
      filters.value.push(event.target.value);
    }
  } else {
    filters.value = filters.value.filter((item) => (typeof item === 'string' && item !== event.target.value) || (typeof item === 'object' && item.id !== +event.target.value));
  }
};

const loadingProducts = () => {
  fetch(`https://dummyjson.com/products?limit=${limit.value}&skip=${counter.value * limit.value}`)
    .then((res) => res.json())
    .then((res) => {
      counter.value += 1;
      products.value = products.value.concat(res.products);
      createFilters();
      console.log(products);
      isCategoriesScrollHidden.value = true;
      if (res.limit < limit.value) {
        isLoadMoreHidden.value = true;
      }
    })
    .catch(console.log);
};



onMounted(() => {
  fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((res) => {
      products.value = res.products;
      createFilters();
      addMockDataToProduct(productsMock.value, products.value)
    })
    .catch(console.log);
});

const dynamicRouteApi = {
  name: 'product',
  params: { id: productsSorted.value.id }
};

const dynamicRouteMock = {
  name: 'product',
  params: { id: `mock-${productsSorted.value.id}` }
};
console.log(productsSorted.value);
</script>


<template>
  <div class="page-catalog container">
    <aside
      id="catalog"
      class="filters"
    >
      <div class="filters__wrapper">
        <h2 class="visially-hidden">
          Filters
        </h2>
        <div class="filters__button-wrapper">
          <button
            class="filters__button-first"
            @click="appearanceAccordion"
          >
            Filters
          </button>
          <select
            v-model="sorting"
            class="filters__button-second"
            name="sorting"
          >
            <option value="popular">
              Popular
            </option>
            <option value="cheap">
              Cheapest first
            </option>
            <option value="expensive">
              Expensive first
            </option>
          </select>
        </div>
        <div
          :class="{ 'filters__accordion-wrapper': true,
                    'active-accordion': isFiltersAccordionHidden }"
        >
          <h3 class="filters__title">
            <button
              :class="{ 'accordion': true, 'active': filtersAccordionStatus.categories }"
              @click="filtersAccordion"
            >
              Categories
            </button>
          </h3>
          <ul
            :class="{'panel filters__list-categories': true,
                     'active': filtersAccordionStatus.categories,
                     'filters__list-categories--scroll panel--scroll': isCategoriesScrollHidden,
            }"
          >
            <li
              v-for="item in categories"
              :key="item"
              class="filters__item"
            >
              <input
                :id="item"
                class="filters__checkbox"
                type="checkbox"
                name="categories"
                :value="item"
                @change="filterItems"
              >
              <label
                class="filters__label"
                :for="item"
              >{{ item.charAt(0).toUpperCase() + item.slice(1) }}</label>
            </li>
          </ul>
          <h3 class="filters__title">
            <button
              :class="{ 'accordion': true, 'active': filtersAccordionStatus.price }"
              @click="filtersAccordion"
            >
              Price
            </button>
          </h3>
          <ul :class="{ 'panel filters__list': true, 'active': filtersAccordionStatus.price }">
            <li
              v-for="item in priceRange"
              :key="item"
              class="filters__item"
            >
              <input
                :id="item.id"
                class="filters__checkbox"
                type="checkbox"
                name="price"
                :value="item.id"
                @change="filterItems"
              >
              <label
                class="filters__label"
                :for="item.id"
              >{{ item.name }}</label>
            </li>
          </ul>
          <h3 class="filters__title">
            <button
              :class="{ 'accordion': true, 'active': filtersAccordionStatus.brands }"
              @click="filtersAccordion"
            >
              Brands
            </button>
          </h3>
          <ul
            :class="{
              'panel panel--scroll filters__list--scroll': true,
              'active': filtersAccordionStatus.brands
            }"
          >
            <li
              v-for="item in brands"
              :key="item"
              class="filters__item"
            >
              <input
                :id="item"
                class="filters__checkbox"
                type="checkbox"
                name="brands"
                :value="item"
                @change="filterItems"
              >
              <label
                class="filters__label"
                :for="item"
              >{{ item }}</label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
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
            class="products-catalog__link"  :to="item.mock ? dynamicRouteMock : dynamicRouteApi"
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
      <div
        v-show="!filters.length && !isLoadMoreHidden"
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
  .filters {
    &__wrapper {
      display: flex;
      flex-direction: column;
    }

    &__title {
      padding-bottom: 20px;
    }

    &__list {
      margin-bottom: 48px;
    }

    &__sorting {
      margin-bottom: 20px;
    }
  
    &__accordion-wrapper {
      margin-bottom: 50px;
    }
  
    &__list--scroll {
      width: 270px;
      max-height: 250px;
      overflow-y: scroll;
    }
  
    &__list-categories {
      margin-bottom: 48px;
      max-height: 130px;
    }
  
    &__list-categories--scroll {
      overflow-y: scroll;
    }
  
    &__button-first {
      display: none;
    }
  
    &__button-wrapper {
      display: block;
    }
  
    &__button-second {
      position: relative;
      width: 120px;
      height: 40px;
      margin-bottom: 20px;
      font-family: $font-secondary;
      font-size: 14px;
      color: $background-primary;
      background-color: $background-third;
      border-width: 0;
      appearance: none;
      text-align: center;
    }
  
    &__button-second:not([multiple]) {
      padding-right: 5px;
      background-repeat: no-repeat;
      background-position: 105px 16px;
      background-size: 10px 10px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cpath d='M70.3 13.8L40 66.3 9.7 13.8z' fill='%23000'%3E%3C/path%3E%3C/svg%3E");
    }
  
    &__checkbox {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
    }
  
    &__label {
      position: relative;
      display: block;
      padding-left: 25px;
      font-family: $font-secondary;
      cursor: pointer;
    }
  
    &__label::before {
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      width: 16px;
      height: 16px;
      margin-top: -10px;
      content: '';
      background-color: #fff;
      border: 1px solid #dcdcdc;
      border-radius: 2px;
      opacity: 1;
    }
  
    &__label::after {
      position: absolute;
      top: 2px;
      left: 5px;
      width: 5px;
      height: 10px;
      content: '';
      border: solid #fff;
      border-width: 0 1px 1px 0;
      opacity: 0;
      transform: rotate(45deg);
    }
  
    &__checkbox:checked+&__label::after {
      opacity: 1;
    }
  
    &__checkbox:checked+&__label::before {
      background-color: #4e4d93;
      opacity: 1;
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