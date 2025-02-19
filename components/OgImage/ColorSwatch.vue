<template>
  <div class="flex flex-col-reverse h-full w-full "
      :style="{ backgroundColor: color.hex }">
    
    <div v-if="title" class="m-1em text-white text-6xl/0 mix-blend-luminosity ">
      <p class="font-bold ">{{ title }}</p>
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