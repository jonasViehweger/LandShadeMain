<template>
  <div class="color-swatch-container">
    <div v-if="title" class="text-center mb-2 text-gray-700 dark:text-gray-300">{{ title }}</div>
    <div
      class="color-swatch w-16 h-16 rounded cursor-pointer relative"
      :style="{ backgroundColor: color.hex }"
      @click="copyToClipboard"
    >
      <span
        v-if="showHex"
        class="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-75 rounded"
      >
        {{ color.hex }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  color: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const showHex = ref(false);

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.color.hex);
};
</script>

<style scoped>
.color-swatch:hover span {
  display: flex;
}

.color-swatch span {
  display: none;
}
</style>
