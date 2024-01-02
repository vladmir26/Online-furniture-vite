import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  state: () => ({
    isCountVisible: false,
    countAdd: 0,
    isActiveAnimation: false,
  }),
  actions: {
    addCount(value) {
      this.isCountVisible = true;
      this.countAdd += Number(value);
      localStorage.setItem('count-visible', this.isCountVisible);
      localStorage.setItem('count-add', this.countAdd);
    },
    addCountLocalStorage() {
      const storedCountVisible = localStorage.getItem('count-visible');
      const storedCountAdd = localStorage.getItem('count-add');
      if (storedCountVisible && storedCountAdd) {
        this.isCountVisible = true;
        this.countAdd = Number(storedCountAdd);
      }
    },
    animationActive(delay) {
      this.isActiveAnimation = true;
      setTimeout(() => {
        this.isActiveAnimation = false;
      }, delay);
    },
  },
});