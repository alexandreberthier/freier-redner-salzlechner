<template>
  <component
      :is="hasLink ? 'router-link' : 'div'"
      :to="hasLink ? linkOptions : null"
      :class="['button', buttonType, {'disabled': disabled}]"
      v-bind="!hasLink ? { role: 'button' } : {}"
  >
    <p>{{ buttonText }}</p>
    <div v-if="isLoading" class="loading-spinner"></div>
  </component>
</template>

<script setup lang="ts">
import {computed} from "vue";
import type {ButtonType} from "@/models/Enums";

const props = defineProps<{
  buttonText: string
  buttonType: ButtonType
  hasLink?: boolean
  pathName?: string
  hash?: string
  disabled?: boolean
}>()

const linkOptions = computed(() =>
    props.pathName
        ? {name: props.pathName, ...(props.hash && {hash: props.hash})}
        : {}
)

const isLoading = defineModel('isLoading', {default: false})

</script>

<style scoped>

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 170px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 24px;
  cursor: pointer;
  transition: all 150ms ease;
  min-height: 50px;

  &.disabled {
    background-color: gray !important;
    cursor: not-allowed;
    pointer-events: none;
  }

  p {
    font-weight: 600;
  }

  &.primary {
    background-color: var(--dark-green);
    color: white;

    p {
      color: white;
    }

    &:hover {
      background-color: var(--darker-green)
    }
  }

  &.secondary {
    background-color: var(--white);
    color: var(--dark-green);
    border: 1px solid var(--dark-green);

    &:hover {
      background-color: lightgray;
    }
  }
}

.loading-spinner {
  border: 6px solid var(--white);
  border-top: 6px solid var(--beige);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>
