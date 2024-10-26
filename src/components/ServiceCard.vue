<template>
  <router-link :to="{name: service.pathName}">
    <div class="card-wrapper">
      <div class="image-wrapper">
        <img :src="getImage(service.image)" :alt="service.alt">
      </div>
      <div class="text-wrapper">
        <h3>{{ service.heading }}</h3>
        <p>{{ service.text }}</p>
      </div>
      <DynamicButton
          :has-link="true"
          :path-name="service.pathName"
          :button-text="t('learnMore')"
          :button-type="ButtonType.Primary"
      />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type {Service} from "@/models/PropInterfaces";
import {ButtonType} from "@/models/Enums";
import {getImage} from "@/utils/ImageUtils";
import DynamicButton from "@/components/DynamicButton.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

defineProps<{
  service: Service
}>()
</script>

<style scoped>

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 300px;
  height: 500px;
  box-sizing: border-box;
  padding: 20px 14px;
  border: 1px solid var(--dark-green);
  border-radius: 14px;
  cursor: pointer;

  &:hover .image-wrapper img {
    transform: scale(1.1);
  }

  &:hover {
    border: 2px solid var(--dark-green)
  }

  .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 200px;
    border-radius: 14px;

    img {
      width: 100%;
      height: 100%;
      object-position: 50% 30%;
      object-fit: cover;
      border-radius: 14px;
      transition: transform 400ms ease-in-out;
    }
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
    min-height: 140px;

    p {
      min-width: 270px;
    }
  }
}

@media (min-width: 1200px) {
  .card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 300px;
    height: 540px;
    box-sizing: border-box;
    padding: 20px 14px;
    border: 1px solid var(--dark-green);
    border-radius: 14px;
    cursor: pointer;
  }

}

</style>