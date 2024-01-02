import { ref, computed, onMounted } from 'vue';
import { useCountStore } from '../store';

export default (await import('vue')).defineComponent({
setup() {
const count = ref(1);
const isModalActive = ref(false);
const countStore = useCountStore();

const limitedCounter = computed(() => Math.max(count.value, 1));

const addPlus = () => { count.value += 1; };
const addMinus = () => { count.value -= 1; count.value = limitedCounter.value; };
const addCart = () => { const dialogBox = document.getElementById('dialogBox'); dialogBox.showModal(); countStore.addCount(count.value); countStore.animationActive('6000'); };
const closeDialog = () => { const dialogBox = document.getElementById('dialogBox'); dialogBox.close(); };



onMounted(() => { const dialogBox = document.getElementById('dialogBox'); dialogBox.close(); });

HTMLDialogElement.prototype.triggerShow = HTMLDialogElement.prototype.showModal,
HTMLDialogElement.prototype.showModal = function () {
this.triggerShow();
this.onclick = (event) => {
const rect = this.getBoundingClientRect();
if (event.clientY < rect.top || event.clientY > rect.bottom) return this.close();
if (event.clientX < rect.left || event.clientX > rect.right) return this.close();
};
}, 
           ;

return { count, isModalActive, limitedCounter, addPlus, addMinus, addCart, closeDialog };
},
});
