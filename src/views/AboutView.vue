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
      <div class="image-wrapper">
        <iframe width="100%" height="100%"
                src="https://www.youtube.com/embed/1lKrSjl0ZfY?si=Oo4WPTniUHe8gDdj"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      </div>
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

  .image-wrapper {
    border-radius: 14px;

    iframe {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 14px;
    }
  }

  .skill-flex {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    flex-wrap: wrap;

    .skill {
      display: flex;
      align-items: center;
      gap: 10px;

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
    flex-direction: row;
    gap: unset;
    justify-content: space-between;
    align-items: center;

    .image-wrapper {
      iframe {
        width: 400px;
        aspect-ratio: 16 / 9;
        border-radius: 14px;
        height: auto;
      }
    }

    .skill-flex {
      gap: 32px;
    }
  }
}

@media (min-width: 1920px) {
  .bottom-section {
    flex-direction: row;
    gap: 60px;
    justify-content: center;


    .image-wrapper {
      iframe {
        width: 600px;
        aspect-ratio: 16 / 9;
        border-radius: 14px;
        height: auto;
      }
    }

    .skill-flex {
      gap: 50px;
    }
  }
}


</style>