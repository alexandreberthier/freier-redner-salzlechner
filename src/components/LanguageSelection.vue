<template>
  <div @click="toggleLanguageOptions" class="language-selection">
    <div class="selected-option">
      <div class="icon-wrapper">
        <img :src="getImage('ic_globe.png')" alt="Globale Sprachauswahl">
      </div>
      <p>{{ currentLanguage.toUpperCase() }}</p>
    </div>
    <div class="language-options" v-if="showLanguageOptions">
      <div
          class="option"
          v-for="(lang, index) in availableLanguages"
          :key="index"
          @click.stop="changeLanguage(lang)">
        <p>{{ lang.toUpperCase() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from "@/utils/ImageUtils";
import { computed, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { centralStore } from "@/stores/centralStore";

const store = centralStore();
const router = useRouter();
const route = useRoute();
const showLanguageOptions = ref(false);

const currentLanguage = computed(() => store.locale as 'de' | 'en');

const availableLanguages = computed(() => {
  return ['de', 'en'].filter(lang => lang !== currentLanguage.value) as ('de' | 'en')[];
})

function toggleLanguageOptions() {
  showLanguageOptions.value = !showLanguageOptions.value;
}

function changeLanguage(lang: 'de' | 'en') {
  store.setLocale(lang);
  router.push({
    path: `/${lang}${route.path.replace(/^\/(de|en)/, '')}`,
  })

  showLanguageOptions.value = false;
}
</script>

<style scoped>
.language-selection {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 50px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid var(--darker-green);

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 24px;
    height: 24px;
  }

  p {
    font-size: 16px;
    font-weight: bold;
  }

  .selected-option {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .language-options {
    position: absolute;
    top: 110%;
    left: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

  .option {
    padding: 8px 12px;
    box-sizing: border-box;
    cursor: pointer;
    text-align: left;
    width: 100%;
  }
}
</style>
