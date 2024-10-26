<template>
  <div class="dark-mode-toggle" @click="toggleDarkMode">
    <img
        :src="getImage(isDarkMode ? 'ic_sun.png' : 'ic_moon.png')"
        alt="Toggle Dark Mode"
        class="toggle-icon"
    />
  </div>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {getImage} from "@/utils/ImageUtils";
import {centralStore} from "@/stores/centralStore";

const store = centralStore()
const isDarkMode = computed(() => store.darkMode);

function toggleDarkMode() {
  store.toggleDarkMode();
}
</script>

<style scoped>
.dark-mode-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 50px
}

.toggle-icon {
  width: 24px;
  height: 24px;
}
</style>
