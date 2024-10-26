<template>
  <StaticSiteLayout
      :header="t('weddingHeader')"
      :subHeaderText="t('weddingSubText')"
      :image1="'img_tom3.webp'"
      image1alt="Laura und Tom"
      :image2="'img_tom10.webp'"
      image2alt="Hochzeit von Philip und Maxi"
      :main-text-header="t('weddingMainTextHeader')"
      :mainText1="t('weddingMainText1')"
      :mainText2="t('weddingMainText2')"
      :faqs="faqs"
      :quotes="quotes"
  >
  </StaticSiteLayout>
</template>

<script setup lang="ts">

import {computed, type ComputedRef} from "vue";
import type {Quote} from "@/models/PropInterfaces";
import StaticSiteLayout from "@/components/layouts/StaticSiteLayout.vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()

const quotes: ComputedRef<Quote[]> = computed(() => [
  {
    text: t('guestComment1'),
    author: 'Benjamin'
  },
  {
    text: t('guestComment2'),
    author: 'Maxi und Philip'
  },
  {
    text: t('guestComment3'),
    author: 'Elisabeth'
  }
])

const faqs = computed(() => [
  {
    id: 1,
    question: t('weddingFaqQuestion1'),
    answer: t('weddingFaqAnswer1'),
  },
  {
    id: 2,
    question: t('weddingFaqQuestion2'),
    answer: t('weddingFaqAnswer2'),
  },
  {
    id: 3,
    question: t('weddingFaqQuestion3'),
    answer: t('weddingFaqAnswer3'),
  },
  {
    id: 4,
    question: t('weddingFaqQuestion4'),
    answer: t('weddingFaqAnswer4'),
  },
  {
    id: 5,
    question: t('weddingFaqQuestion5'),
    answer: t('weddingFaqAnswer5'),
  }
])

</script>

<style scoped>

</style>