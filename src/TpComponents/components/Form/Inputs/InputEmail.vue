<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email } from "@vuelidate/validators";
import { ExclamationCircleIcon } from "@heroicons/vue/solid";

const state = reactive({
  localValue: null,
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
    default: "you@example.com",
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
  localValue: {
    ...props.validator,
    email: email,
  },
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
      :data-test="dataTest + '-label'"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        type="email"
        :maxlength="maxLength"
        v-model="v$.localValue.$model"
        :disabled="disabled"
        :readonly="readonly"
        id="email-input"
        :data-test="dataTest + '-input'"
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
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        v-if="v$.localValue.$invalid"
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
      </div>
    </div>

    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      <slot name="info" />
    </p>

    <p class="mt-2 text-xs text-green-600 dark:text-green-400">
      <slot name="success" />
    </p>

    <span v-if="showError">
      <p
        v-if="v$.localValue?.email?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-email-error'">{{ v$.localValue.email.$message }}</span>
      </p>
      <p
        v-if="v$.localValue?.required?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-required-error'">{{ v$.localValue.required.$message }}</span>
      </p>
      <p
        v-if="v$.localValue?.maxLength?.$invalid"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        <span class="font-medium" :data-test="dataTest + '-maxLength-error'">{{ v$.localValue?.maxLength.$message }}</span>
      </p>
      <p class="mt-2 text-xs text-red-600 dark:text-red-400">
        <span class="font-medium"><slot name="error" /></span>
      </p>
    </span>
  </div>
</template>
