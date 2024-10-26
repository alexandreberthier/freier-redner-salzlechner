import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { centralStore } from '@/stores/centralStore';
import i18n from "@/assets/translations/i18n";

const supportedLocales = ['de', 'en'] as const;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:locale(de|en)?',
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          titleKey: 'homeTitle',
          metaDescriptionKey: 'homeDescription',
        }
      },
      {
        path: 'uebermich',
        name: 'about',
        component: ()=> import('@/views/AboutView.vue'),
        meta: {
          titleKey: 'aboutTitle',
          metaDescriptionKey: 'aboutDescription',
        }
      },
      {
        path: 'hochzeit',
        name: 'wedding',
        component: ()=> import('@/views/WeddingView.vue'),
        meta: {
          titleKey: 'weddingTitle',
          metaDescriptionKey: 'weddingDescription',
        }
      },
      {
        path: 'willkommensfest',
        name: 'child-celebration',
        component: ()=> import('@/views/ChildCelebrationView.vue'),
        meta: {
          titleKey: 'childCelebrationTitle',
          metaDescriptionKey: 'childCelebrationDescription',
        }
      },
      {
        path: 'lebens-und-trauerfeier',
        name: 'celebrations',
        component: ()=> import('@/views/FuneralView.vue'),
        meta: {
          titleKey: 'celebrationsTitle',
          metaDescriptionKey: 'celebrationsDescription',
        }
      },
      {
        path: 'moderation',
        name: 'moderation',
        component: ()=> import('@/views/ModerationView.vue'),
        meta: {
          titleKey: 'moderationTitle',
          metaDescriptionKey: 'moderationDescription',
        }
      },
      {
        path: 'impressum',
        name: 'imprint',
        component: ()=> import('@/views/ImprintView.vue'),
        meta: {
          titleKey: 'imprintTitle',
          metaDescriptionKey: 'imprintDescription',
        }
      },
      {
        path: ':pathMatch(.*)*',
        redirect: (to) => `/${to.params.locale || 'de'}/`,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        return {
          el: element,
          behavior: 'smooth',
        };
      }
    } else {
      return { top: 0, left: 0, behavior: 'smooth' };
    }
  },
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const store = centralStore();
  let locale = to.params.locale as typeof supportedLocales[number] | undefined;

  if (!locale || !supportedLocales.includes(locale)) {
    locale = store.locale || 'de';
    return next(`/${locale}${to.path}`);
  }

  store.setLocale(locale);
  next();
});

router.afterEach((to) => {
  const store = centralStore();
  const currentLang = store.locale;

  const meta = to.meta as {
    titleKey?: string;
    metaDescriptionKey?: string;
  };

  if (meta.titleKey) {
    document.title = i18n.global.t(meta.titleKey, {}, currentLang);
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && meta.metaDescriptionKey) {
    metaDescription.setAttribute(
        'content',
        i18n.global.t(meta.metaDescriptionKey, {}, currentLang)
    );
  }
  document.documentElement.lang = currentLang;
});

export default router;
