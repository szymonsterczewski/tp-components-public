<template>
  <Listbox
    as="div"
    @update:modelValue="onInput"
    v-model="v$.localValue.$model"
    :multiple="multiple"
    :disabled="disabled"
  >
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
      props.label
    }}</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton
        v-if="!multiple"
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-tp-primary sm:text-sm sm:leading-6"
      >
        <span class="block truncate">{{
          v$.localValue?.$model?.label || placeholder || ""
        }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>
      <ListboxButton
        v-if="multiple"
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-tp-primary sm:text-sm sm:leading-6"
      >
        <span class="block truncate">{{
          v$.localValue.$model.map((item) => item.label).join(", ") ||
          placeholder ||
          "&nbsp;"
        }}</span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option.value"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-tp-primary text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
                >{{ option.label }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-tp-primary',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
  <p
    v-if="v$.localValue?.required?.$invalid"
    class="mt-2 text-xs text-red-600 dark:text-red-400"
  >
    <span class="font-medium">{{ v$.localValue.required.$message }}</span>
  </p>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";

const state = reactive({
  localValue: [],
});

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
  multiple: {
    type: Boolean,
    default: false,
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
});

const emit = defineEmits(["input"]);

const rules = {
  localValue: props.validator || {},
};

const onInput = (value) => {
  if (props.emitType === "value") {
    if (props.multiple) {
      emit(
        "input",
        value.map((item) => item.value),
      );
      return;
    }

    emit("input", value.value);
  } else {
    emit("input", value);
  }
};

const v$ = useVuelidate(rules, state);
</script>
