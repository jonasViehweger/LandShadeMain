<script setup>
import { useRoute } from 'vue-router';
import ColorSwatch from '@/components/ColorSwatch.vue';
import { colors } from '@/data/colors'; // Assuming colors.js is imported here

definePageMeta({
  layout: 'basic', // Use the 'country' layout
});

const route = useRoute();
const ISO3Code = route.params.ISO3;

// Function to convert RGB to HEX
const rgbToHex = (r, g, b) => {
  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Group colors by landCover and calculate mean RGB values
const landCoverColors = colors
  .filter(color => color.shapeGroup === ISO3Code)
  .reduce((acc, color) => {
    if (!acc[color.landCover]) {
      acc[color.landCover] = { red: 0, green: 0, blue: 0, count: 0 };
    }
    acc[color.landCover].red += color.red;
    acc[color.landCover].green += color.green;
    acc[color.landCover].blue += color.blue;
    acc[color.landCover].count += 1;
    return acc;
  }, {});

const meanColors = Object.entries(landCoverColors).map(([landCover, { red, green, blue, count }]) => ({
  landCover,
  hex: rgbToHex(Math.round(red / count), Math.round(green / count), Math.round(blue / count)),
}));
</script>

<template>
  <div>
    <h1>Country Page for {{ ISO3Code }}</h1>
    <div class="flex flex-wrap gap-4">
      <ColorSwatch
        v-for="color in meanColors"
        :title="color.landCover"
        :key="color.landCover"
        :color="{ hex: color.hex }"
      />
    </div>
  </div>
</template>