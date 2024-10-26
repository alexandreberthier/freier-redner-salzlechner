<template>
  <div class="outer-wrapper">
    <div class="accordion-wrapper">
      <AccordionItem
          v-for="faq in accordionItems"
          :key="faq.id"
          :faq="faq"
          :is-open="activeIndex === faq.id"
          @toggleContent="toggleContent(faq.id)"
      />
    </div>
    <div v-if="showCTA" class="contact-section">
      <h3>{{t('moreQuestions')}}</h3>
      <p>{{t('thereForYou')}}</p>
      <DynamicButton
          :has-link="true"
          path-name="home"
          hash="#contact"
          :button-text="t('contact')"
          :button-type="ButtonType.Primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">


import type {FaqItem} from "@/models/PropInterfaces";
import {ref, type Ref} from "vue";
import {ButtonType} from "@/models/Enums";
import AccordionItem from "@/components/AccordionItem.vue";
import DynamicButton from "@/components/DynamicButton.vue";

import {useI18n} from "vue-i18n";

const {t} = useI18n()

defineProps<{
  accordionItems: FaqItem[]
  showCTA?: boolean
}>()

const activeIndex: Ref<number | null> = ref(null)

function toggleContent(id: number) {
  activeIndex.value = activeIndex.value === id ? null : id
}

</script>

<style scoped>

.outer-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .accordion-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contact-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }
}
</style>