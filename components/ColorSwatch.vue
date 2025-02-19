<template>
  <div class="flex flex-col-reverse group size-40 rounded relative"
      :style="{ backgroundColor: color.hex }"
      @click="copyToClipboard">
    <div v-if="title" class="m-2 text-white mix-blend-luminosity">
      <p class="font-bold">{{ title }}</p>
      <p >{{ color.hex }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.color.hex);
};
</script>