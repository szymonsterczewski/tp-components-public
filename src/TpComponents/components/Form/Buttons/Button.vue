<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "primary",
  },
  dataTest: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :disabled="disabled"
    :data-test="dataTest + '-button'"
    @click="emit('click')"
    :class="['font-bold py-2 px-4 rounded',
              disabled ? 'bg-tp-grey-300 text-white' :
              type === 'primary' ? 'bg-tp-primary hover:bg-tp-primary-dark text-white' :
              type === 'primary-bordered' ? 'bg-transparent text-tp-primary border-tp-primary border hover:bg-tp-primary hover:text-white' :
              type === 'secondary' ? 'bg-tp-secondary hover:bg-tp-secondary-dark text-white' :
              type === 'secondary-bordered' ? 'bg-transparent text-tp-secondary border-tp-secondary border hover:bg-tp-secondary hover:text-white' :
              'bg-blue-500 text-white hover:bg-blue-700'
            ]"
  >
    <slot :data-test="dataTest + '-text'">{{ dataTest }}</slot>
  </button>
</template>
