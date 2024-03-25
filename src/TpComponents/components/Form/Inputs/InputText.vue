<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";

const state = reactive({
  localValue: "",
});

const emit = defineEmits(["input"]);

const props = defineProps({
  value: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  showError: {
    type: Boolean,
    default: true,
  },
  maxLength: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
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
      for="input-text"
      :data-test="dataTest + '-label'"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <input
      type="text"
      id="input-text"
      v-model="v$.localValue.$model"
      :disabled="disabled"
      :readonly="readonly"
      :data-test="dataTest"
      :class="{
          'pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500':
            v$.localValue.$invalid,
          'text-gray-900 shadow-sm placeholder:text-gray-400':
            !v$.localValue.$invalid,
      }"
      class="block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset"
      :placeholder="placeholder"
      :maxlength="maxLength || null"
      @input="onInput"
    />
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
        <span class="font-medium">{{ v$.localValue.required.$message }}</span>
      </p>
      <p
        v-if="v$.localValue?.maxLength?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium">{{ v$.localValue?.maxLength.$message }}</span>
      </p>
      <p
        v-if="v$.localValue?.minLength?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium">{{ v$.localValue?.minLength.$message }}</span>
      </p>
      <p class="mt-2 text-xs text-red-600 dark:text-red-400">
        <span class="font-medium"><slot name="error" /></span>
      </p>
    </span>
  </div>
</template>
