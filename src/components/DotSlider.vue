<template>
  <div class="outer">
    <div ref="sliderWrapper" class="slider-wrapper">
      <div ref="slidesWrapper" class="slides-wrapper" @scroll="handleScroll">
        <slot></slot>
      </div>
    </div>
    <div v-if="showNavigation" class="navigation-dot-wrapper">
      <div
          v-for="(dot, index) in Math.min(slideCount, navigationDotsCount)"
          :key="index"
          class="dot"
          :class="{ active: index === activeSlideIndex }"
          @click="goToSlide(index)">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, nextTick, type Ref, type ComputedRef} from 'vue';

const sliderWrapper: Ref<HTMLDivElement | null> = ref(null);
const slidesWrapper: Ref<HTMLDivElement | null> = ref(null);
const combinedSlidesWidth: Ref<number> = ref(0);
const slideCount: Ref<number> = ref(0);
const singleSlideWidth: Ref<number> = ref(0);
const singleSlideHeight: Ref<number> = ref(0);
const activeSlideIndex: Ref<number> = ref(0);
const sliderWidth: Ref<number> = ref(0);
const visibleSlideCount: Ref<number> = ref(0);
const gapSize = 20;

let observer: MutationObserver | null = null;

const showNavigation: ComputedRef<boolean> = computed(() =>
{
  return combinedSlidesWidth.value > sliderWidth.value;
})

const navigationDotsCount: ComputedRef<number> = computed(() =>
{
  const dotsCount = slideCount.value - visibleSlideCount.value + 1;
  return dotsCount > 0 ? dotsCount : 0;
})

function goToSlide(index: number)
{
  if (slidesWrapper.value)
  {
    slidesWrapper.value.scrollTo({
      left: index * (singleSlideWidth.value + gapSize),
      behavior: 'smooth'
    })
    activeSlideIndex.value = index;
  }
}

function handleScroll()
{
  if (slidesWrapper.value)
  {
    const scrollLeft = slidesWrapper.value.scrollLeft;
    activeSlideIndex.value = Math.round(scrollLeft / (singleSlideWidth.value + gapSize));
  }
}

function updateSliderDimensions()
{
  nextTick(() =>
  {
    if (sliderWrapper.value && slidesWrapper.value)
    {
      slideCount.value = Array.from(slidesWrapper.value.children).length;
      if (slideCount.value > 0)
      {
        singleSlideWidth.value = slidesWrapper.value.children[0].clientWidth;
        singleSlideHeight.value = slidesWrapper.value.children[0].clientHeight;
        combinedSlidesWidth.value
            = singleSlideWidth.value * slideCount.value + gapSize * (slideCount.value - 1);
        sliderWidth.value = sliderWrapper.value.clientWidth;
        visibleSlideCount.value
            = Math.floor((sliderWidth.value + gapSize) / (singleSlideWidth.value + gapSize));
        sliderWrapper.value.style.minHeight = `${singleSlideHeight.value}px`;
      }
    }
  })
}

function observeMutations()
{
  if (slidesWrapper.value)
  {
    observer = new MutationObserver(() =>
    {
      updateSliderDimensions();
    })
    observer.observe(slidesWrapper.value, { childList: true });
  }
}

onMounted(() =>
{
  nextTick(() =>
  {
    updateSliderDimensions();
    window.addEventListener('resize', updateSliderDimensions);
    observeMutations();
  })
})

onUnmounted(() =>
{
  window.removeEventListener('resize', updateSliderDimensions);
  if (observer)
  {
    observer.disconnect();
  }
})
</script>

<style scoped>
.outer {
  position: relative;
  z-index: 10;
  display: flex;
}
.slider-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.slides-wrapper {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* For Firefox */
}

.slides-wrapper::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}

.slides-wrapper > * {
  flex: 0 0 auto;
}

.navigation-dot-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
}

.dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--beige);
  cursor: pointer;
  margin: 0 5px;
  transition: all 500ms ease;
}

.dot.active {
  background-color: var(--darker-green)
}
</style>