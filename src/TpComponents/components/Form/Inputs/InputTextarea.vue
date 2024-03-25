<script setup>
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";

const state = reactive({
  localValue: [],
});

const emit = defineEmits(["input"]);

const props = defineProps({
  label: {
    type: String,
    default: null,
    required: false,
  },
  value: {
    type: String,
    default: null,
    required: false,
  },
  placeholder: {
    type: String,
    default: null,
    required: false,
  },
  maxLength: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showError: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  validator: {
    type: Object,
    default: () => {},
  },
  dataTest: {
    type: String,
    required: true,
  }
});

const rules = {
  localValue: props.validator || {},
};

const onInput = () => {
  emit("input", state.localValue);
};

const v$ = useVuelidate(rules, state);
</script>

<template>
  <div>
    <label
      v-if="label"
      for="input-textarea"
      class="block text-sm font-medium leading-6 text-gray-900"
      :data-test="dataTest + '-label'"
      >{{ label }}</label
    >
    <div class="mt-2">
      <textarea
        v-model="v$.localValue.$model"
        @input="onInput"
        rows="4"
        :placeholder="placeholder"
        name="comment"
        :maxlength="maxLength"
        :disabled="disabled"
        :readonly="readonly"
        :data-test="dataTest + '-textarea'"
        id="input-textarea"
        class="block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-tp-primary"
        :class="{
          'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500':
            v$.localValue.$invalid,
          'text-gray-900 shadow-sm placeholder:text-gray-400':
            !v$.localValue.$invalid,
        }"
      >{{ value }}</textarea
      >
    </div>
    <span v-if="showError">
      <p
        v-if="v$.localValue?.email?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-email-error'">{{
          v$.localValue.email.$message
        }}</span>
      </p>
      <p
        v-if="v$.localValue?.required?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-required-error'">{{
          v$.localValue.required.$message
        }}</span>
      </p>
      <p
        v-if="v$.localValue?.maxLength?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-maxLength-error'">{{
          v$.localValue?.maxLength.$message
        }}</span>
      </p>
      <p
          v-if="v$.localValue?.minLength?.$invalid"
          class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-maxLength-error'">{{
            v$.localValue?.minLength.$message
            }}</span>
      </p>
      <p class="mt-2 text-xs text-red-600 dark:text-red-400">
        <span class="font-medium"><slot name="error" /></span>
      </p>
    </span>
  </div>
</template>
