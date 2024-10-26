<template>
  <div class="footer-outer-wrapper">
    <div class="footer-wrapper">
      <div class="link-section">
        <p class="links-header">{{ t('lookHere') }}</p>
        <div class="link-flex">
          <router-link
              v-for="(link, index) in links"
              :key="index"
              :to="{name: link.pathName}">
            <span class="link">
            {{ link.linkText }}
              </span>
          </router-link>
        </div>
      </div>
      <div class="divider"></div>
      <div class="social-section">
        <div class="socials">
          <p class="social-links-header">{{ t('followMyAdventures')  }}</p>
          <div class="social-flex">
            <a
                v-for="(social, index) in socials"
                :key="index"
                :href="social.href">
              <div class="icon-wrapper">
                <img :src="getImage(social.icon)" :alt="social.alt">
              </div>
            </a>
          </div>
        </div>
        <div class="partner-section">
          <p class="partner-header">{{t('isWorthIt')  }}</p>
          <a href="https://freieredner.at/?gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVA5gXL_Eio1Z7rLDB4IMg5dxgrwKyoazUWmLHzZ1vaP8qhdy7vQm4hoCAjUQAvD_BwE">
            <div class="icon-wrapper">
              <img :src="getImage('i_freier_redner.svg')" alt="freier redner">
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, type Ref, ref} from "vue";
import type {Link, SocialLink} from "@/models/PropInterfaces";
import {getImage} from "@/utils/ImageUtils";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const links: Ref<Link[]> = computed(() => [
  {
    linkText: t('aboutHeader'),
    pathName: 'about',
  },
  {
    linkText:  t('weddingHeader'),
    pathName: 'wedding',
  },
  {
    linkText:  t('childCelebrationHeader'),
    pathName: 'child-celebration',
  },
  {
    linkText:  t('funeralHeader'),
    pathName: 'celebrations',
  },
  {
    linkText:  t('moderationLinkHeader'),
    pathName: 'moderation',
  },

  {
    linkText: t('imprintHeader'),
    pathName: 'imprint',
  }
])

const socials: Ref<SocialLink[]> = ref([
  {
    href: 'https://www.facebook.com/tom.f.salt',
    icon: 'ic_facebook.png',
    alt: 'facebook'
  },
  {
    href: 'https://www.instagram.com/freier.redner.tom/',
    icon: 'ic_instagram.png',
    alt: 'instagram'
  }
])

</script>

<style scoped>

.footer-outer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 14px;

  .footer-wrapper {
    width: 90%;
    max-width: 1250px;
    box-sizing: border-box;
    padding: 18px 32px;
    border-radius: 14px;
    background-color: var(--beige);
    display: flex;
    flex-direction: column;
    gap: 32px;

    .link-section {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .links-header {
        font-weight: bold;
      }

      .link-flex {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: var(--darker-green);
    }

    .social-section {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .socials {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .social-links-header {
          font-weight: bold;
        }

        .social-flex {
          display: flex;
          align-items: center;
          gap: 16px;

          .icon-wrapper {
            img {
              width: 32px;
              height: 32px;
            }
          }
        }
      }

      .partner-section {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .partner-header {
          font-weight: bold;
        }

        .icon-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;

          img {
            width: 200px;
            height: 109px;
          }
        }
      }
    }
  }
}

@media (min-width: 740px) {
  .footer-outer-wrapper {
    margin-bottom: 24px;

    .footer-wrapper {
      padding: 24px 50px;
      flex-direction: row;
      justify-content: center;
      gap: 50px;

      .divider {
        display: none;
      }

      .social-section {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 50px;
      }
    }
  }
}

@media (min-width: 1200px) {
  .footer-outer-wrapper {
    margin-bottom: 34px;

    .footer-wrapper {
      gap: 180px;

      .link {
        font-size: 18px;
      }

      .link-section {
        .links-header {
          font-size: 20px;
        }
      }

      .social-section {
        gap: 180px;

        .socials {
          .social-links-header {
            font-size: 20px;
          }
        }

        .partner-section {
          .partner-header {
            font-size: 20px;
          }
        }
      }
    }
  }
}

</style>