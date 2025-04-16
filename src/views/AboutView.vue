<template>
  <StaticSiteLayout
      :header="t('aboutHeader')"
      :subHeaderText="t('aboutSubText')"
      :image1="'img_tom11.webp'"
      image1alt="Benni und Tom"
      :image2="'Freier-Redner-Tom_92.webp'"
      image2alt="Tom und Freunde"
      :main-text-header="t('aboutMainTextHeader')"
      :mainText1="t('aboutMainText1')"
      :mainText2="t('aboutMainText2')"
      :faqs="faqs"
      :quotes="quotes"
  >
    <section class="bottom-section">
      <a href="https://freieredner.at/redner/tom-salzlechner/" target="_blank" class="image-wrapper">
        <img :src="getImage('ic_freie_redner_abnner.jpg')" alt="">
      </a>
      <div class="skill-flex">
        <div
            v-for="(skill, index) in skills"
            :key="index"
            class="skill">
          <div class="icon-wrapper">
            <img :src="getImage(skill.image)" :alt="skill.alt">
          </div>
          <p>{{ skill.text }}</p>
        </div>
      </div>
    </section>
  </StaticSiteLayout>
</template>

<script setup lang="ts">
import {computed, type ComputedRef} from "vue";
import type {Quote} from "@/models/PropInterfaces";
import {getImage} from "@/utils/ImageUtils";
import StaticSiteLayout from "@/components/layouts/StaticSiteLayout.vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()


const quotes: ComputedRef<Quote[]> = computed(() => [
  {
    text: t('quote4'),
    author: 'Freie Redner'
  },
  {
    text: t('quote2'),
    author: 'Freie Redner'
  },
  {
    text: t('quote3'),
    author: 'Freie Redner'
  },
  {
    text: t('quote1'),
    author: 'Tom'
  }
])

const faqs = computed(() => [
  {
    id: 1,
    question: t('aboutFaqQuestion1'),
    answer: t('aboutFaqAnswer1'),
  },
  {
    id: 2,
    question: t('aboutFaqQuestion2'),
    answer: t('aboutFaqAnswer2'),
  },
  {
    id: 3,
    question: t('aboutFaqQuestion3'),
    answer: t('aboutFaqAnswer3'),
  },
  {
    id: 4,
    question: t('aboutFaqQuestion4'),
    answer: t('aboutFaqAnswer4'),
  },
  {
    id: 5,
    question: t('aboutFaqQuestion5'),
    answer: t('aboutFaqAnswer5'),
  }
])

const skills = computed(() => [
  {
    image: 'ic_language.png',
    alt: 'hut',
    text: t('aboutSkill1'),
  },
  {
    image: 'ic_microphone.png',
    alt: 'mikrofon',
    text: t('aboutSkill2'),
  },
  {
    image: 'ic_palette.png',
    alt: 'palette',
    text: t('aboutSkill3'),
  },
  {
    image: 'ic_graduation.png',
    alt: 'ausbildung',
    text: t('aboutSkill4'),
  }
])
</script>

<style scoped>

.bottom-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 70px;

  .image-wrapper {
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      max-width: 640px;
      height: auto;
    }
  }

  .skill-flex {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    .skill {
      display: flex;
      align-items: center;
      gap: 32px;
      flex: 1 1 200px;

      .icon-wrapper {
        img {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .bottom-section {
    .skill-flex {
      gap: 32px;
    }
  }
}

@media (min-width: 1920px) {
  .bottom-section {
    gap: 60px;


    .skill-flex {
      gap: 50px;
      justify-content: center;
    }
  }
}


</style>