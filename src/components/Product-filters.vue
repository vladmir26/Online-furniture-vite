<script setup>
import { computed, onBeforeMount, onMounted, onUpdated, reactive, ref } from "vue";

const props = defineProps({
  products: Array
})

const sortingModule = defineModel('sorting', { default: 'popular' })
const optionsModule = defineModel('options', { default: [] }  // price.1, categories.name...
)

const options = reactive({
  categories: [],
  brands: [],
  maxPrice: 0
})

console.log('Product-filter setup')
console.log('props', props.products.length)
createFilters()


onBeforeMount(() => {
  console.log('Product-filter onBeforeMounted')
})

onMounted(() => {
  console.log('Product-filter onMounted')
})

onUpdated(() => {
  console.log('Product-filter onUpdated')
})

const isFiltersAccordionHidden = ref(false);

const oneThirdPrice = computed(() => Math.ceil(options.maxPrice / 3));

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
    name: `${oneThirdPrice.value * 2 + 1} - ${options.maxPrice}`,
    minValue: oneThirdPrice.value * 2 + 1,
    maxValue: options.maxPrice,
  },
]);

const filtersAccordionStatus = ref({
  categories: false,
  price: false,
  brands: false,
});

const appearanceAccordion = () => {
  console.log("appearanceAccordion --------")
  isFiltersAccordionHidden.value = !isFiltersAccordionHidden.value;
};


const filtersAccordion = (event) => {
  console.log(event.target.innerText, "--------")
  const filterName = event.target.innerText.toLowerCase();
  filtersAccordionStatus.value[filterName] = !filtersAccordionStatus.value[filterName];
};

function createFilters(){
  console.log('CreateFilters')
  props.products.forEach((product) => {
    if(!options.categories.length || !options.categories.includes(product.category)) {
      options.categories.push(product.category)
    }

    if(!options.brands.length || !options.brands.includes(product.brand)) {
      options.brands.push(product.brand)
    }
    options.maxPrice = product.price > options.maxPrice ? product.price : options.maxPrice;
  });
  
  console.log('CreateFilters options', options)
};

</script>

<template>
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
          v-model="sortingModule"
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
            v-for="item in options.categories"
            :key="item"
            class="filters__item"
          >
            <input
            v-model="optionsModule"
              :id="item"
              class="filters__checkbox"
              type="checkbox"
              :name="'categories.' + item"
              :value="'categories.' + item"
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
              v-model="optionsModule"
              :id="item.id"
              class="filters__checkbox"
              type="checkbox"
              :name="'price.'  + item.id"
              :value="'price.' + item.id"
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
            v-for="item in options.brands"
            :key="item"
            class="filters__item"
          >
            <input
            v-model="optionsModule"
              :id="item"
              class="filters__checkbox"
              type="checkbox"
              :name="'brands.' + item"
              :value="'brands.' + item"
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
</template>

<style scoped lang="scss">
@import "../variables.scss";
@import "../main.scss";
.filters {
    flex-basis: 150px;
    margin-top: 48px;
    margin-left: 50px;
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
      // display: none;
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
  }
</style>