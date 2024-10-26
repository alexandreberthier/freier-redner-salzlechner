<template>
  <div class="content-wrapper">
    <h1>{{ t('imprintHeader') }}</h1>
    <StaticSection :section-header="t('imprintSectionHeader1')">
      <div class="text-section">
        <p>Thomas Salzlechner</p>
        <p>Mühlbachstraße 51</p>
        <p>5201 Seekirchen</p>
        <p>Österreich</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader2')">
      <div class="text-section">
        <p>Telefon: +436602802923</p>
        <p>E-Mail: tom.s@freieredner.at</p>
        <p>Website: www.freier-redner-tom.at</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader3')">
      <div class="text-section">
        <p>{{t('imprintSectionText3')}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader4')">
      <div class="text-section" v-html="t('imprintSectionText4')"></div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader5')">
      <div class="text-section">
        <p>{{t('imprintSectionText5')}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader6')">
      <div class="text-section">
        <p>Thomas Salzlechner</p>
        <p>Mühlbachstraße 51</p>
        <p>5201 Seekirchen</p>
        <p>Österreich</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader7')">
      <div class="text-section">
        <p>{{t('imprintSectionText7')}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader8')">
      <div class="text-section">
        <p>{{t('imprintSectionText8')}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="t('imprintSectionHeader9')">
      <div class="text-section" v-html="t('imprintSectionText9')"></div>
    </StaticSection>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import StaticSection from "@/components/layouts/StaticSection.vue";
const {t} = useI18n()

</script>
