<template>
  <div
      v-if="showScrollButton"
      role="button"
      class="scroll-button"
      @click="scrollToTop"
  >
    <img :src="getImage('ic_chevron_double.png')" alt="chevron">
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, type Ref} from 'vue';
import {getImage} from "@/utils/ImageUtils";

const showScrollButton: Ref<boolean> = ref(false);

function scrollToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function handleScroll() {
  const scrollPosition = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  showScrollButton.value = scrollPosition > pageHeight / 2;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
})
</script>

<style scoped>
.scroll-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: var(--dark-green);
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  bottom: 50px;
  right: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;

  img {
    width: 35px;
    height: 35px;
  }
}
</style>
