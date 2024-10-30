<template>
  <div class="content-wrapper">
    <section class="header-section">
      <h1>{{ header }}</h1>
      <p class="sub-header-text">{{ subHeaderText }}</p>
    </section>

    <section class="main-section">
      <div ref="topWrapper" class="top-wrapper">
        <div class="image-wrapper">
          <img :src="getImage(image1)" :alt="image1alt">
        </div>
        <div class="heading-text">
          <h2>{{ mainTextHeader }}</h2>
          <p class="main-text1" v-html="mainText1"></p>
        </div>
      </div>
      <div ref="bottomWrapper" class="bottom-wrapper">
        <p class="main-text2" v-html="mainText2"></p>
        <div class="image-wrapper">
          <img :src="getImage(image2)" :alt="image2alt">
          <span v-if="isWeddingPicture" class="credit">(c) Claudia Weaver</span>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <DynamicAccordion
          :accordion-items="faqs"
      />
    </section>

    <section class="quote-section">
      <DotSlider>
        <div v-for="(quote, index) in quotes" :key="index" class="slide">
          <div class="image-wrapper">
            <img :src="getImage('ic_quote.png')" alt="image">
          </div>
          <p class="text">{{ quote.text }}</p>
          <p class="author"> - {{ quote.author }}</p>
        </div>
      </DotSlider>
    </section>
    <slot></slot>
  </div>

</template>

<script setup lang="ts">


import {getImage} from "@/utils/ImageUtils";
import DynamicAccordion from "@/components/DynamicAccordion.vue";
import DotSlider from "@/components/DotSlider.vue";
import {onMounted, ref} from "vue";
import type {FaqItem, Quote} from "@/models/PropInterfaces";

defineProps<{
  header: string,
  subHeaderText: string
  image1: string,
  image1alt: string,
  image2: string,
  image2alt: string,
  mainTextHeader: string
  mainText1: string,
  mainText2: string
  faqs: FaqItem[]
  quotes: Quote[]
  isWeddingPicture?: boolean
}>()

const topWrapper = ref(null)
const bottomWrapper = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
  })

  if (topWrapper.value) observer.observe(topWrapper.value);
  if (bottomWrapper.value) observer.observe(bottomWrapper.value);
})

</script>

<style scoped>
.header-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .top-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    transform: translateX(-30%);
    transition: all 600ms ease-in-out;


    &.visible {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  .bottom-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    transform: translateX(30%);
    transition: all 600ms ease-in-out;

    &.visible {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  .main-text1, .main-text2, .heading-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .main-text1, .main-text2 {
    text-align: justify;
  }

  .image-wrapper {
    height: 250px;
    width: 100%;
    position: relative;

    .credit {
      position: absolute;
      top: 100%;
      right: 5px;
      color: var(--dark-green);
      font-style: italic;
      font-size: 14px
    }

    img {
      width: 320px;
      height: 250px;
      border-radius: 14px;
      object-fit: cover;
    }
  }
}


.slide {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  text-align: center;

  .image-wrapper {
    img {
      width: 50px;
      height: 50px;
    }
  }

  .text {
    width: 80%;
    font-size: 20px;
    font-style: italic;
    font-family: Bitter, sans-serif;
  }

  .author {
    font-size: 16px;
  }
}


@media (min-width: 740px) {

  .main-section {
    .image-wrapper {
      height: 350px;
      width: 100%;

      img {
        min-width: 620px;
        height: 350px;
        border-radius: 14px;
        object-fit: cover;
      }
    }
  }

  .slide {
    min-width: 620px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    text-align: center;

    .image-wrapper {
      img {
        width: 50px;
        height: 50px;
      }
    }

    .text {
      width: 80%;
      font-size: 20px;
      font-style: italic;
      font-family: Bitter, sans-serif;
    }

    .author {
      font-size: 16px;
    }
  }
}

@media (min-width: 1200px) {
  .header-section {
    display: flex;
    flex-direction: row;
    gap: 32px;
    justify-content: center;
    align-items: flex-start;

    h1 {
      width: 415px;
    }

    .sub-header-text {
      width: 415px;
    }
  }

  .main-section {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .top-wrapper, .bottom-wrapper {
      display: flex;
      flex-direction: row;
      gap: 50px;
      width: 100%;
      align-items: center;
    }

    h3 {
      width: 415px;
    }

    .main-text1, .main-text2 {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 395px;
    }

    .image-wrapper {
      height: 380px;
      width: 415px;

      img {
        min-width: unset;
        width: 415px;
        height: 380px;
        border-radius: 14px;
      }
    }
  }

  .slide {
    min-width: 860px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    text-align: center;

    .image-wrapper {
      img {
        width: 50px;
        height: 50px;
      }
    }

    .text {
      width: 80%;
      font-size: 20px;
      font-style: italic;
      font-family: Bitter, sans-serif;
    }

    .author {
      font-size: 16px;
    }
  }

  .quote-section {
    max-width: 860px;
    margin: 0 auto;
  }


}

@media (min-width: 1920px) {

  .header-section {
    display: flex;
    flex-direction: row;

    h1 {
      width: 600px;
    }

    .sub-header-text {
      width: 600px;
    }
  }

  .main-section {
    margin: 0 auto;
    gap: 60px;

    h3 {
      width: 600px;
    }

    .main-text1, .main-text2 {
      width: 600px;
    }

    .image-wrapper {
      height: 400px;
      width: 500px;

      img {
        width: 500px;
        height: 400px;
      }
    }
  }

}


</style>