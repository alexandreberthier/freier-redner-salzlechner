<template>
  <StaticSiteLayout
      :header="t('funeralHeader')"
      :subHeaderText="t('funeralSubText')"
      :image1="'img_tom18.webp'"
      image1alt="Tom Schwarz Weiss"
      :image2="'img_tom5.webp'"
      image2alt="Messestand Freie Redner"
      :main-text-header="t('funeralMainTextHeader')"
      :mainText1="t('funeralMainText1')"
      :mainText2="t('funeralMainText2')"
      :faqs="faqs"
      :quotes="quotes"
  >
  </StaticSiteLayout>
</template>

<script setup lang="ts">
import {computed, type ComputedRef} from "vue";
import type {Quote} from "@/models/PropInterfaces";
import {useI18n} from "vue-i18n";
import StaticSiteLayout from "@/components/layouts/StaticSiteLayout.vue";
const {t} = useI18n()

const quotes: ComputedRef<Quote[]> = computed(() => [
  {
    text: t('quoteFuneral1'),
    author: 'Tom'
  },
  {
    text: t('quoteFuneral2'),
    author: 'Tom'
  },
  {
    text: t('quoteFuneral3'),
    author: 'Tom'
  }
])

const faqs = computed(() => [
  {
    id: 1,
    question: t('funeralFaqQuestion1'),
    answer: t('funeralFaqAnswer1'),
  },
  {
    id: 2,
    question: t('funeralFaqQuestion2'),
    answer: t('funeralFaqAnswer2'),
  },
  {
    id: 3,
    question: t('funeralFaqQuestion3'),
    answer: t('funeralFaqAnswer3'),
  },
  {
    id: 4,
    question: t('funeralFaqQuestion4'),
    answer: t('funeralFaqAnswer4'),
  },
  {
    id: 5,
    question: t('funeralFaqQuestion5'),
    answer: t('funeralFaqAnswer5'),
  }
])

</script>

<style scoped>

</style>