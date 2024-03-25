
<script setup>
import { reactive, ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { useVuelidate } from "@vuelidate/core";
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  validator: {
    type: Object,
    default: () => {},
  },
  enabledText: {
    type: String,
    default: null,
  },
  disabledText: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["input"]);

const state = reactive({
  localValue: false,
});

const onInput = () => {
  console.log(state.localValue);
  emit("input", Boolean(state.localValue));
};

const rules = props.validator;

const v$ = useVuelidate(rules, state);
</script>

<template>
  <SwitchGroup as="div" class="flex items-center">
    <SwitchLabel v-if="enabledText" as="span" class="mr-3 text-sm">
        <span class="font-medium text-gray-900">{{ enabledText }}</span>
        {{ ' ' }}
    </SwitchLabel>
    <Switch :disabled="disabled" @click="onInput" v-model="state.localValue" :class="[state.localValue ? 'bg-tp-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-tp-primary focus:ring-offset-2']">
        <span class="sr-only">Use setting</span>
        <span aria-hidden="true" :class="[state.localValue ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
    </Switch>
    <SwitchLabel v-if="disabledText" as="span" class="ml-3 text-sm">
        <span class="font-medium text-gray-900">{{ disabledText }}</span>
        {{ ' ' }}
    </SwitchLabel>
  </SwitchGroup>
</template>

