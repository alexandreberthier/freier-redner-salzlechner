<template>
  <StaticSiteLayout
      :header="t('childCelebrationHeaderSmall')"
      :subHeaderText="t('childCelebrationSubText')"
      :image1="'Freier-Redner-Tom_65.webp'"
      image1alt="Lou"
      :image2="'Freier-Redner-Tom_108.webp'"
      image2alt="Tom"
      :main-text-header="t('childCelebrationMainTextHeader')"
      :mainText1="t('childCelebrationMainText1')"
      :mainText2="t('childCelebrationMainText2')"
      :faqs="faqs"
      :quotes="quotes"

  >
  </StaticSiteLayout>
</template>

<script setup lang="ts">
import {computed, type ComputedRef} from "vue";
import StaticSiteLayout from "@/components/layouts/StaticSiteLayout.vue";
import type {Quote} from "@/models/PropInterfaces";
import {useI18n} from "vue-i18n";
const {t} = useI18n()

const quotes: ComputedRef<Quote[]> = computed(() => [
  {
    text: t('quoteChild1'),
    author: 'Tom'
  },
  {
    text: t('quoteChild2'),
    author: 'Tom'
  },
  {
    text: t('quoteChild3'),
    author: 'Tom'
  },
  {
    text: t('quoteChild4'),
    author: 'Tom'
  },
])

const faqs = computed(() => [
  {
    id: 1,
    question: t('childCelebrationFaqQuestion1'),
    answer: t('childCelebrationFaqAnswer1')
  },
  {
    id: 2,
    question: t('childCelebrationFaqQuestion2'),
    answer: t('childCelebrationFaqAnswer2')
  },
  {
    id: 3,
    question: t('childCelebrationFaqQuestion3'),
    answer: t('childCelebrationFaqAnswer3')
  },
  {
    id: 4,
    question: t('childCelebrationFaqQuestion4'),
    answer: t('childCelebrationFaqAnswer4')
  },
  {
    id: 5,
    question: t('childCelebrationFaqQuestion5'),
    answer: t('childCelebrationFaqAnswer5')
  }
])

</script>
