<template>
  <div :class="['nav-wrapper', {'shrink' : isScrolling}]">
    <div class="left-content">
      <router-link
          @click="closeMenu"
          :to="{name: 'home'}">
        <div class="logo-wrapper">
          <!--<img :src="getImage('ic_logo.png')" alt="logo">-->
          <p>TS</p>
        </div>
      </router-link>
    </div>
    <div class="right-content">
      <div :class="['link-menu', {'open': menuOpen}]">
        <router-link @click="closeMenu"
                     v-for="(link, index) in links"
                     :key="index"
                     :to="{name: link.pathName}">
          <span class="link">{{ link.linkText }}</span>
        </router-link>
      </div>
      <div class="hide-desktop">
        <Toggle/>
        <LanguageSelection/>
      </div>
      <div @click="toggleMenu"
           :class="{'active': menuOpen}"
           class="hamburger-menu">
        <span></span>
      </div>
    </div>
    <div class="wrapper">
      <div class="show-desktop">
        <LanguageSelection/>
        <Toggle/>
      </div>
      <DynamicButton
          :button-type="ButtonType.Primary"
          :has-link="true"
          path-name="home"
          hash="#contact"
          :button-text="t('letsSpeak')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">


import {computed, type ComputedRef, onMounted, onUnmounted, ref, type Ref} from "vue";
import {ButtonType} from "@/models/Enums";
import type {Link} from "@/models/PropInterfaces";
import DynamicButton from "@/components/DynamicButton.vue";
import { useI18n } from "vue-i18n";
import LanguageSelection from "@/components/LanguageSelection.vue";
import Toggle from "@/components/Toggle.vue";

const { t } = useI18n()

const menuOpen: Ref<boolean> = ref(false)

const isScrolling = ref(false);
let lastScrollPosition = 0;
let scrollTimeout: number | null = null;

function handleScroll() {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    isScrolling.value = true;
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = window.setTimeout(() => {
      isScrolling.value = false;
    }, 150);
  }
  lastScrollPosition = currentScrollPosition;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  toggleBodyScroll(menuOpen.value);
}

function closeMenu() {
  menuOpen.value = false;
  toggleBodyScroll(menuOpen.value);
}

function toggleBodyScroll(isMenuOpen: boolean) {
  if (isMenuOpen && window.innerWidth < 1200) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function handleResize() {
  if (window.innerWidth >= 1200) {
    toggleBodyScroll(false);
  } else {
    toggleBodyScroll(menuOpen.value);
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
})


const links: ComputedRef<Link[]> = computed(() => [
  {
    linkText: t('aboutHeader'),
    pathName: 'about'
  },
  {
    linkText:  t('weddingHeader'),
    pathName: 'wedding'
  },
  {
    linkText: t('childCelebrationHeader'),
    pathName: 'child-celebration'
  },
  {
    linkText: t('funeralHeader'),
    pathName: 'celebrations'
  },
  {
    linkText:t('moderationLinkHeader'),
    pathName: 'moderation'
  }
])
</script>

<style scoped>

.hide-desktop {
  display: flex;
  align-items: center;
}

.nav-wrapper {
  width: 100%;
  box-sizing: border-box;
  height: 90px;
  background-color: var(--beige);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 5px 20px 5px 0;
  transition: all 200ms ease-in-out;

  &.shrink {
    height: 65px;
  }

  .left-content {
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
    }

    .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        padding-left: 20px;
        font-family: Playfair, sans-serif;
        font-size: 40px;
      }

      img {
        width: 80px;
        height: 80px;
      }
    }
  }

  .right-content {
    display: flex;
    align-items: center;
    gap: 10px;

    .link-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      position: fixed;
      left: 0;
      right: 0;
      top: 90px;
      height: 100%;
      z-index: 50;
      transform: translateX(100%);
      transition: all 150ms ease-in-out;
      opacity: 0;
      background-color: white;
      box-sizing: border-box;
      padding-top: 100px;

      &.open {
        transform: translateX(0);
        opacity: 1;
      }

      a {
        font-size: 35px;

      }
    }

    .hamburger-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      background-color: white;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        span {
          background-color: transparent;

          &:before {
            transform: rotate(45deg);
            top: 0;

          }

          &:after {
            transform: rotate(-45deg);
            top: 0;
          }
        }

      }

      span {
        width: 30px;
        height: 3px;
        background-color: black;
        position: relative;
        display: block;

        &:before,
        &:after {
          content: '';
          width: 30px;
          height: 3px;
          background-color: black;
          position: absolute;
          left: 0;
          transition: all 0.3s ease-in-out;
        }

        &:before {
          top: -8px;
        }

        &:after {
          top: 8px;
        }

      }
    }
  }
}

.wrapper {
  display: none;

  .show-desktop {
    display: none;
  }
}


@media (min-width: 1200px) {
  .hide-desktop {
    display: none;
  }

  .nav-wrapper {
    height: 110px;
    padding: 5px 25px 5px 0;

    .right-content {
      .link-menu {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 35px;
        position: static;
        height: 100%;
        z-index: 50;
        transform: translateX(0);
        opacity: 1;
        background-color: transparent;
        padding-top: 0;

        a {
          font-size: 22px;
        }
      }

      .hamburger-menu {
        display: none;
      }
    }
  }

  .wrapper {
    display: flex;
    gap: 10px;

    .show-desktop {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
  }
}
</style>