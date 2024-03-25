<script setup>
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";

const state = reactive({
  localValue: null,
});

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  legend: {
    type: String,
    required: false,
    default: null,
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
  validator: {
    type: Object,
    default: () => {},
  },
  dataTest: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["input"]);

const onInput = () => {
  emit("input", state.localValue);
};

const rules = {
  localValue: props.validator,
};

const v$ = useVuelidate(rules, state);
</script>

<template>
  <fieldset>
    <legend v-if="legend" class="text-sm font-semibold leading-6 text-gray-900">
      {{ legend }}
    </legend>
    <p v-if="description" class="mt-1 text-sm leading-6 text-gray-600">
      {{ description }}
    </p>
    <div class="mt-6 space-y-6">
      <div
        class="flex items-center gap-x-3"
        v-for="(option, index) in options"
        :key="index"
      >
        <input
          :id="option.value"
          v-model="v$.localValue.$model"
          :value="option.value"
          type="radio"
          class="h-4 w-4 border-gray-300 text-tp-primary focus:ring-tp-primary"
          @change="onInput"
          :data-test="dataTest"
        />
        <label
          :for="option.value"
          class="block text-sm font-medium leading-6 text-gray-900"
          >{{ option.label }}</label
        >
      </div>
    </div>
  </fieldset>
</template>
