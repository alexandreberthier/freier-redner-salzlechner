<template>
  <div class="content-wrapper">
    <section ref="hero" class="hero fade-up">
      <h1>{{ t('homeHeader') }}</h1>
      <p>{{ t('homeSubText') }}</p>
      <div class="button-section">
        <DynamicButton
            :button-type="ButtonType.Primary"
            :has-link="true"
            path-name="home"
            hash="#contact"
            :button-text="t('letsSpeak')"
        />
        <DynamicButton
            :button-type="ButtonType.Secondary"
            :has-link="true"
            path-name="about"
            :button-text="t('aboutMe')"
        />
      </div>
    </section>
    <section class="hero-images">
      <div ref="image1" class="image-wrapper fade-up">
        <img class="image1" :src="getImage('img_tom1.webp')" alt="Tom und Benji">
      </div>
      <div ref="image2" class="image-wrapper fade-up">
        <img class="image2" :src="getImage('tom_start2NEU.webp')" alt="Hochzeit">
      </div>
      <div ref="image3" class="image-wrapper fade-up">
        <img class="image3" :src="getImage('tom_startNEU.webp')" alt="Tom">
        <span>Sarah Karner Photography</span>
      </div>
    </section>
  </div>

  <section class="text-section">
    <div ref="textSection" class="text-wrapper fade-up">
      <div class="top-section">
        <h2>{{ t('homeBannerHeader') }}</h2>
        <p>{{ t('homeBannerText1') }}</p>
      </div>
      <div class="bottom-section">
        <div class="left">
          <p>{{ t('homeBannerText2') }}</p>
          <p>{{ t('homeBannerText3') }}</p>
        </div>
        <div class="right">
          <p>{{ t('homeBannerText4') }}</p>
          <p>{{ t('homeBannerText5') }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="slider-section">
    <h2>{{ t('homeServiceSectionHeader') }}</h2>
    <DotSlider>
      <ServiceCard v-for="(service, index) in services" :key="index" :service="service"/>
    </DotSlider>
  </section>

  <div class="content-wrapper">
    <section class="faq-section">
      <h2>{{ t('faqsHeader') }}</h2>
      <div class="accordion-flex">
        <DynamicAccordion :accordion-items="faqs"/>
      </div>
    </section>

    <section id="contact" class="contact-section">
      <h2>{{ t('contactHeader') }}</h2>
      <p>{{ t('contactSubText') }}</p>
      <div class="contact-options">
        <a v-for="(option, index) in contactOptions"
           :key="index"
           :href="option.href">
          <div class="option">
            <div class="option-info">
              <div class="icon-wrapper">
                <img :src="getImage(option.image)" :alt="option.alt">
              </div>
              <p>{{ option.text }}</p>
            </div>
            <div class="icon-wrapper-chevron">
              <img :src="getImage('ic_chevron_right.png')" alt="chevron rechts">
            </div>
          </div>
        </a>
      </div>
      <div class="form-section">
        <h3 class="extra-margin">{{ t('contactForm') }}</h3>
        <div class="input-flex">
          <DynamicInputField
              :type="InputType.Text"
              :label="t('firstName')"
              v-model:user-input="firstName"
              v-model:error="firstNameError"
          />
          <DynamicInputField
              :type="InputType.Text"
              :label="t('lastName')"
              v-model:user-input="lastName"
              v-model:error="lastNameError"
          />
        </div>
        <div class="input-flex">
          <DynamicInputField
              :label="t('email')"
              :type="InputType.Email"
              v-model:user-input="email"
              v-model:error="emailError"
          />
          <DynamicInputField
              :label="t('phoneNumber')"
              :type="InputType.Phone"
              v-model:user-input="phoneNumber"
              v-model:error="phoneNumberError"
          />
        </div>
        <DynamicInputField
            :type="InputType.Text"
            :label="t('yourMessage')"
            :text-area="true"
            v-model:user-input="message"
            v-model:error="messageError"
        />
        <div class="button-wrapper">
          <DynamicButton
              @click="sendContactForm"
              :button-text="t('sendButton')"
              :button-type="ButtonType.Primary"
              :disabled="buttonDisabled"
              v-model:is-loading="isLoading"
          />
        </div>
        <div class="messages">
          <p v-if="successMessage">{{ successMessage }}</p>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
import {computed, type ComputedRef, nextTick, onMounted, type Ref, ref} from 'vue';
import DynamicButton from "@/components/DynamicButton.vue";
import {getImage} from "@/utils/ImageUtils";
import ServiceCard from "@/components/ServiceCard.vue";
import type {Service} from "@/models/PropInterfaces";
import {ButtonType, InputType} from "@/models/Enums";
import DynamicAccordion from "@/components/DynamicAccordion.vue";
import DynamicInputField from "@/components/DynamicInputField.vue";
import emailjs from '@emailjs/browser';
import DotSlider from "@/components/DotSlider.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

interface ContactOption {
  href: string,
  text: string,
  image: string,
  alt: string
}

const firstName: Ref<string> = ref('')
const lastName: Ref<string> = ref('')
const phoneNumber: Ref<string> = ref('')
const email: Ref<string> = ref('')
const message: Ref<string> = ref('')

const firstNameError: Ref<string> = ref('')
const lastNameError: Ref<string> = ref('')
const phoneNumberError: Ref<string> = ref('')
const emailError: Ref<string> = ref('')
const messageError: Ref<string> = ref('')

const successMessage: Ref<string> = ref('')
const errorMessage: Ref<string> = ref('')
const isLoading = ref(false)
const buttonDisabled = ref(false)

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

function sendContactForm() {
  let isValid = true;

  const fields = [
    {value: firstName, error: firstNameError},
    {value: lastName, error: lastNameError},
    {value: email, error: emailError},
    {value: phoneNumber, error: phoneNumberError},
    {value: message, error: messageError}
  ];

  fields.forEach(field => {
    if (!field.value.value) {
      field.error.value = t('dontForgetField')
      isValid = false;
    } else {
      field.error.value = '';
    }
  })

  if (!isValid) {
    nextTick(() => {
      const firstErrorElement = document.querySelector('.input-wrapper .error');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    })
    return;
  }

  isLoading.value = true;
  buttonDisabled.value = true;

  const templateParams = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    message: message.value
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        successMessage.value = t('successMessage')
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        phoneNumber.value = '';
        message.value = '';
      })
      .catch((error: any) => {
        errorMessage.value = t('formErrorMessage')
        console.error(error);
      })
      .finally(() => {
        isLoading.value = false;
        buttonDisabled.value = false;
      })
}


const hero = ref(null);
const image1 = ref(null)
const image2 = ref(null)
const image3 = ref(null)
const textSection = ref(null)

const contactOptions: Ref<ContactOption[]> = ref([
  {
    href: 'mailto:tom.s@freieredner.at',
    text: 'tom.s@freieredner.at',
    image: 'ic_email.png',
    alt: 'email'
  },
  {
    href: 'tel:+436602802923',
    text: '+436602802923',
    image: 'ic_telephone.png',
    alt: 'telefon'
  }
])

const services: ComputedRef<Service[]> = computed(() => [
  {
    image: 'img_tom10.webp',
    alt: t('weddingHeader'),
    heading: t('weddingHeader'),
    text: t('homeServiceCardText1'),
    pathName: 'wedding'
  },
  {
    image: 'img_tom12.webp',
    alt: t('childCelebrationHeader'),
    heading: t('childCelebrationHeader'),
    text: t('homeServiceCardText2'),
    pathName: 'child-celebration'
  },
  {
    image: 'img_tom18.webp',
    alt: t('funeralHeader'),
    heading: t('funeralHeader'),
    text: t('homeServiceCardText3'),
    pathName: 'celebrations'
  },
  {
    image: 'img_tom19.webp',
    alt: t('moderationHeader'),
    heading: t('moderationMainTextHeader'),
    text: t('homeServiceCardText4'),
    pathName: 'moderation'
  }
])

const faqs = computed(() => [
  {
    id: 1,
    question: t('homeFaqQuestion1'),
    answer: t('homeFaqAnswer1'),
  },
  {
    id: 2,
    question: t('homeFaqQuestion2'),
    answer: t('homeFaqAnswer2'),
  },
  {
    id: 3,
    question: t('homeFaqQuestion3'),
    answer: t('homeFaqAnswer3'),
  },
  {
    id: 4,
    question: t('homeFaqQuestion4'),
    answer: t('homeFaqAnswer4'),
  },
  {
    id: 5,
    question: t('homeFaqQuestion5'),
    answer: t('homeFaqAnswer5'),
  }
])

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

  if (hero.value) observer.observe(hero.value);
  if (image1.value) observer.observe(image1.value);
  if (image2.value) observer.observe(image2.value);
  if (image3.value) observer.observe(image3.value);
  if (textSection.value) observer.observe(textSection.value)
})
</script>

<style scoped>


.extra-margin {
  margin-bottom: 16px;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .button-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    & > * {
      width: 100%;
    }
  }
}

.hero-images {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    cursor: crosshair;
    position: relative;
    height: fit-content;

    span {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.5);
      color: var(--white);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 14px;
      font-style: italic;
      white-space: nowrap;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: auto;
      border-radius: 20px;
      transition: all 400ms ease-in-out;
    }

    &:hover img {
      transform: scale(1.2) rotate(5deg);
    }
  }
}

.text-section {
  background-color: var(--beige);
  width: 100%;
  padding: 60px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .text-wrapper {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      text-align: justify;
    }


    .top-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bottom-section {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .left, .right {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
}

.slider-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
  margin: 0 auto;
}

.faq-section {
  display: flex;
  flex-direction: column;
  gap: 16px;


  .accordion-flex {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .messages {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .contact-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 320px;
      border: 1px solid var(--dark-green);
      border-radius: 4px;
      box-sizing: border-box;
      padding: 4px 8px;

      .option-info {
        display: flex;
        align-items: center;
        gap: 20px;
        width: 85%;

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }

      &:hover .icon-wrapper-chevron img {
        transform: translateX(10px);
      }

      .icon-wrapper-chevron {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 20px;
          height: 20px;
          transition: all 200ms ease-in-out;
        }
      }

    }
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .input-flex {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

  }
}

@media (min-width: 740px) {

  .hero {
    .button-section {
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: flex-start;
      gap: 16px;

      & > * {
        width: 170px;
      }
    }
  }

  .hero-images {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 280px;

    .image-wrapper {
      .image1 {
        height: 250px;
        width: 300px;
        align-self: center;
      }

      .image2 {
        height: 142px;
        width: 142px;
        align-self: flex-end;
      }

      .image3 {
        height: 200px;
        width: 142px;
        align-self: flex-start;
      }
    }
  }

  .text-section {
    .text-wrapper {
      width: 620px;
      gap: 16px;

      .bottom-section {
        display: flex;
        flex-direction: row;
        gap: 32px;

        .left, .right {
          width: 50%;
        }
      }
    }
  }

  .slider-section {
    width: 640px;
  }

  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}


@media (min-width: 1200px) {
  .hero-images {
    display: flex;
    flex-direction: row;
    gap: 16px;
    height: 350px;

    .image-wrapper {
      .image1 {
        height: 280px;
        width: 400px;
      }

      .image2 {
        height: 180px;
        width: 170px;
      }

      .image3 {
        height: 200px;
        width: 170px;
      }
    }
  }

  .text-section {
    .text-wrapper {
      width: 860px;

      .bottom-section {
        display: flex;
        flex-direction: row;
        gap: 32px;

        .left, .right {
          width: 50%;
        }
      }
    }
  }

  .contact-section {
    .contact-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 32px;
    }

    .form-section {
      .input-flex {
        flex-direction: row;

        & > * {
          width: 50%;
        }
      }
    }
  }

  .slider-section {
    width: 950px;
  }

}

@media (min-width: 1920px) {
  .hero-images {
    display: flex;
    flex-direction: row;
    gap: 16px;
    height: 400px;

    .image-wrapper {
      .image1 {
        height: 350px;
        width: 600px;
      }

      .image2 {
        height: 250px;
        width: 250px;
      }

      .image3 {
        height: 250px;
        width: 250px;
      }
    }
  }

  .text-section {
    .text-wrapper {
      width: 1260px;

      .bottom-section {
        display: flex;
        flex-direction: row;
        gap: 32px;

        .left, .right {
          width: 50%;
        }
      }
    }
  }

  .slider-section {
    width: 1260px;
  }
}

.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 600ms ease-in-out;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
