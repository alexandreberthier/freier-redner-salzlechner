<template>
  <section class="section-wrapper">
    <h3 v-if="sectionHeader">{{sectionHeader}}</h3>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">

defineProps<{
  sectionHeader?: string
}>()

</script>

<style scoped>
.section-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

</style>