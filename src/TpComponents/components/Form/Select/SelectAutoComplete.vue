<template>
  <Combobox
    @update:modelValue="onInput"
    as="div"
    v-model="v$.localValue.$model"
    :disabled="disabled"
  >
    <ComboboxLabel
      v-if="props.label"
      class="block text-sm font-medium text-gray-700"
      >{{ props.label }}</ComboboxLabel
    >
    <div class="relative mt-1">
      <ComboboxInput
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-tp-primary focus:outline-none focus:ring-1 focus:ring-tp-primary sm:text-sm"
        :placeholder="props.placeholder"
        :displayValue="(option) => option?.label"
        @change="query = $event.target.value"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="options.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="(option, index) in options"
          :key="index"
          :value="option"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-tp-primary text-white' : 'text-gray-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ option.label }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-tp-primary',
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
    {{ props.localValue }}
  </Combobox>
  <p
    v-if="v$.localValue?.required?.$invalid"
    class="mt-2 text-xs text-red-600 dark:text-red-400"
  >
    <span class="font-medium">{{ v$.localValue.required.$message }}</span>
  </p>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

const state = reactive({
  localValue: [],
});

let query = ref("");

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  value: {
    type: [String, Number, Array],
    default: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showError: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  validator: {
    type: Object,
    default: () => {},
  },
  dataTest: {
    type: String,
    required: true,
  },
  emitType: {
    type: String,
    default: "value",
  },
});

const emit = defineEmits(["input"]);

const rules = {
  localValue: props.validator || {},
};

const onInput = (value) => {
  if (props.emitType === "value") {
    emit("input", value.value);
  } else {
    emit("input", value);
  }
};

const v$ = useVuelidate(rules, state);
</script>
