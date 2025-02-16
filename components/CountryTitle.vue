<template>
  <div class="relative h-40">
    <!-- Invisible placeholder to set width -->
    <h1 class="invisible text-6xl sm:text-9xl font-bold mr-5">{{ title }}</h1>
    <!-- Styled title layers -->
    <h1 class="absolute inset-2 text-6xl sm:text-9xl font-bold mix-blend-soft-light invert" :style="gradientClasses.replace('to right', 'to left')">
      {{ title }}
    </h1>
    <h1 class="absolute inset-1 text-6xl sm:text-9xl font-bold" :style="gradientClasses">
      {{ title }}
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  colors: {
    type: Array,
    default: () => ['yellow-600', 'green-700']
  }
});

const gradientClasses = computed(() => {
  let colors = [...props.colors];
  return `background: linear-gradient(to right, ${colors.join(", ")}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`;
});
</script>