<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";

const state = reactive({
  localValue: "",
});

const emit = defineEmits(["input"]);

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  value: {
    type: String,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showError: {
    type: Boolean,
    default: true,
  },
  validator: {
    type: Object,
    default: () => {},
  },
  dataTest: {
    type: String,
    required: true,
  },
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
      for="number-input"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      :data-test="dataTest + '-label'"
      >{{ label }}</label
    >
      <div class="relative mt-2 rounded-md shadow-sm">

        <input
        type="number"
        :step="step"
        :min="min"
        :max="max"
        v-model="v$.localValue.$model"
        :disabled="disabled"
        :readonly="readonly"
        id="number-input"
        aria-describedby="helper-text-explanation"
        class="block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-tp-primary"
        :class="{
          'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500':
            v$.localValue.$invalid,
          'text-gray-900 shadow-sm placeholder:text-gray-400':
            !v$.localValue.$invalid,
        }"
        :placeholder="placeholder"
        @input="onInput"
        :data-test="dataTest + '-input'"
      />
    </div>
    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      <slot name="info" />
    </p>

    <p class="mt-2 text-xs text-green-600 dark:text-green-400">
      <slot name="success" />
    </p>

    <span v-if="showError">
      <p
        v-if="v$.localValue?.required?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-required-error'">{{
          v$.localValue.required.$message
        }}</span>
      </p>
      <p
        v-if="v$.localValue?.requiredIf?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-requiredIf-error'">{{
          v$.localValue.requiredIf.$message
        }}</span>
      </p>
      <p
        v-if="v$.localValue?.max?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-min-error'">{{
          v$.localValue?.max.$message
        }}</span>
      </p>
      <p
        v-if="v$.localValue?.min?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-max-error'">{{
          v$.localValue?.min.$message
        }}</span>
      </p>
      <p class="mt-2 text-xs text-red-600 dark:text-red-400">
        <span class="font-medium"><slot name="error" /></span>
      </p>
    </span>
  </div>
</template>
