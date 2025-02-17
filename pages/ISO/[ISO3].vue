<script setup>
import { useRoute } from 'vue-router';
import { colors } from '@/data/colors'; // Assuming colors.js is imported here

definePageMeta({
  layout: 'basic', // Use the 'country' layout
});

const route = useRoute();
const ISO3Code = route.params.ISO3;

const shapeName = colors
  .filter(color => color.shapeGroup === ISO3Code)[0].shapeName;

// Function to convert RGB to HEX
const rgbToHex = (r, g, b) => {
  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Group colors by landCover and calculate mean RGB values
const landColors = colors
  .filter(color => color.shapeGroup === ISO3Code)

const landCoverColors = landColors
  .reduce((acc, color) => {
    if (!acc[color.landCover]) {
      acc[color.landCover] = { red: 0, green: 0, blue: 0, count: 0 };
    }
    acc[color.landCover].red += Math.pow(color.red, 2);
    acc[color.landCover].green += Math.pow(color.green, 2);
    acc[color.landCover].blue += Math.pow(color.blue, 2);
    acc[color.landCover].count += 1;
    return acc;
  }, {});

const meanColors = Object.entries(landCoverColors).map(([landCover, { red, green, blue, count }]) => ({
  landCover,
  hex: rgbToHex(Math.round(Math.sqrt(red / count)), Math.round(Math.sqrt(green / count)), Math.round(Math.sqrt(blue / count))),
})).sort((a, b) => a.landCover.localeCompare(b.landCover));;
</script>

<template>
  <div>
    <div class="flex flex-row justify-between items-start">
      <CountryTitle :title="shapeName" :colors="meanColors.map(color => color.hex).slice(0, 3)" />
      <ShapeSelector/>
    </div>
    <div class="flex gap-4">
      <ColorSwatch
        :title="'Total Mean Color'"
        :color="{ hex: rgbToHex(
          Math.round(meanColors.reduce((sum, c) => sum + parseInt(c.hex.slice(1,3), 16), 0) / meanColors.length),
          Math.round(meanColors.reduce((sum, c) => sum + parseInt(c.hex.slice(3,5), 16), 0) / meanColors.length),
          Math.round(meanColors.reduce((sum, c) => sum + parseInt(c.hex.slice(5,7), 16), 0) / meanColors.length)
        )}"
        class="size-84 mr-1"
      />
      <div class="flex-auto grid gap-4 grid-cols-5">
      
      <ColorSwatch
        v-for="color in meanColors"
        :title="color.landCover"
        :key="color.landCover"
        :color="{ hex: color.hex }"
        class="size-32"
      />
    </div>
    </div>
    
  </div>

<h2 class="text-6xl font-bold my-5 text-gray-900 dark:text-gray-100">Entire year</h2>

  <MonthCategoryGrid :data="landColors" />
</template>