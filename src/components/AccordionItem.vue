<template>
  <div class="accordion-wrapper">
    <div class="question" @click="$emit('toggleContent')">
      <p>{{ faq.question }}</p>
      <div class="icon-wrapper">
        <img
            :class="{'rotate': isOpen}"
            :src="getImage('ic_chevron.png')" alt="chevron">
      </div>
    </div>
    <div v-if="isOpen" class="answer">
      <p>{{ faq.answer }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {FaqItem} from "@/models/PropInterfaces";
import {getImage} from "@/utils/ImageUtils";

defineProps<{
  faq: FaqItem
  isOpen: boolean
}>()

</script>

<style scoped>

.accordion-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--dark-green);
  box-sizing: border-box;
  padding: 6px 12px;
  border-radius: 4px;

  .question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-sizing: border-box;
    padding: 6px 0;

    p {
      max-width: 90%;
      font-weight: 700;
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 20px;
        height: 20px;
        transition: transform 150ms ease-in-out;

        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }

  .answer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>