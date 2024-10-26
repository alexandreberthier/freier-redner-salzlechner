<template>
  <div class="input-wrapper">
    <label :for="label">{{ label }}</label>
    <textarea v-if="textArea"
              v-model="userInput"
              :name="label"
              :id="label"
              cols="25"
              rows="8">
    </textarea>
    <input v-else
           :class="{ 'error': userError }"
           v-model="userInput"
           :type="dynamicInputType"
           :name="label"
           :id="label"
           :aria-label="label"
           :placeholder="placeholder"
    >
    <p class="input-error">{{ userError }}</p>
  </div>
</template>

<script setup lang="ts">
import {computed, type ModelRef, watch} from "vue";
import { InputType } from "@/models/Enums";
import { validateEmail, validatePhoneNumber } from "@/models/ValidationFunctions";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const props = defineProps<{
  label: string,
  type: InputType,
  textArea?: boolean,
  placeholder?: string
}>();


const userInput: ModelRef<string> = defineModel('userInput', { required: true, default: '' });
const userError: ModelRef<string | undefined> = defineModel('error', { default: '' });


watch(userInput, (newVal: string) => {
  if (newVal.trim()) {
    switch (dynamicInputType.value) {
      case InputType.Phone:
        userError.value = validatePhoneNumber(newVal) ? '' : t('invalidPhone');
        break;
      case InputType.Email:
        userError.value = validateEmail(newVal) ? '' : t('invalidEmail');
        break;
      default:
        userError.value = '';
    }
  }
})

const dynamicInputType = computed(() => {
  return props.type || 'text';
})
</script>

<style scoped>
.input-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  label {
    position: absolute;
    top: -10px;
    left: 10px;
    box-sizing: border-box;
    padding: 2px 6px;
    background-color: var(--beige);
    font-size: 16px;
    color: var(--darker-green);
  }

  textarea {
    padding: 20px 8px;
    font-family: Catamaran, sans-serif;
    font-size: 18px;
    outline: none;
    width: 100%;
    border: 1px solid var(--dark-green);
    border-radius: 4px;
    box-sizing: border-box;

    &.error {
      border: 2px solid red;
    }
  }

  input {
    height: 65px;
    width: 100%;
    border: 1px solid var(--dark-green);
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    padding: 4px 8px;
    font-family: Catamaran, sans-serif;
    font-size: 18px;

    &.error {
      border: 2px solid red;
    }
  }

  .input-error {
    font-size: 14px;
    text-align: end;
    color: red;
  }
}
</style>
