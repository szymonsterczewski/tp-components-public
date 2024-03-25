<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: null,
    required: false,
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

const state = reactive({
  localValue: [],
});

const emit = defineEmits(["input"]);

const rules = {
  localValue: props.validator,
};

const onInput = () => {
  emit("input", state.localValue);
};

const v$ = useVuelidate(rules, state);
</script>

<template>
  <div>
    <fieldset>
      <legend
        v-if="props.label"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        {{ props.label }}
      </legend>
      <div class="mt-6 space-y-6">
        <div
          class="relative flex gap-x-3"
          v-for="(option, index) in options"
          :key="index"
        >
          <div class="flex h-6 items-center">
            <input
              @change="onInput"
              :id="option.value"
              v-model="v$.localValue.$model"
              name="comments"
              type="checkbox"
              :value="option.value"
              :data-test="dataTest + '-option-' + index"
              class="h-4 w-4 rounded border-gray-300 text-tp-primary focus:ring-tp-primary"
            />
          </div>
          <div class="text-sm leading-6">
            <label
              :for="option.index + '-label'"
              :data-test="dataTest + '-label-' + index"
              class="font-medium text-gray-900"
              >{{ option.label }}</label
            >
            <p class="text-gray-500" v-if="option.description">
              {{ option.description }}
            </p>
          </div>
        </div>
      </div>
    </fieldset>
    <p
      v-if="v$.localValue?.required?.$invalid"
      class="mt-2 text-xs text-red-600 dark:text-red-400"
    >
      <span class="font-medium">{{ v$.localValue.required.$message }}</span>
    </p>
  </div>
</template>