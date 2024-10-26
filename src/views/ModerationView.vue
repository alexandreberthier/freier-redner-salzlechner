<template>
  <StaticSiteLayout
      :header="t('moderationHeader')"
      :subHeaderText="t('moderationSubText')"
      :image1="'img_tom19.webp'"
      image1alt="Tom mit Mikrofon"
      :image2="'img_tom15.webp'"
      image2alt="Tom mit Sonnenbrille"
      :main-text-header="t('moderationMainTextHeader')"
      :mainText1="t('moderationMainText1')"
      :mainText2="t('moderationMainText2')"
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
    question: t('moderationFaqQuestion1'),
    answer: t('moderationFaqAnswer1'),
  },
  {
    id: 2,
    question: t('moderationFaqQuestion2'),
    answer: t('moderationFaqAnswer2'),
  },
  {
    id: 3,
    question: t('moderationFaqQuestion3'),
    answer: t('moderationFaqAnswer3'),
  },
  {
    id: 4,
    question: t('moderationFaqQuestion4'),
    answer: t('moderationFaqAnswer4'),
  },
  {
    id: 5,
    question: t('moderationFaqQuestion5'),
    answer: t('moderationFaqAnswer5'),
  }
])

</script>

<style scoped>

</style>