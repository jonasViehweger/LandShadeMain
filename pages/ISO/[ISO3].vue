<script setup>
import { useRoute } from 'vue-router';
import { useHead } from '#imports';
import  colors  from '@/assets/colors.json'; 
import countries from '@/assets/countries.json';
import { reflectanceColorToHex, reflectanceToSRGB } from '@/utils/reflectanceColorToHex';

definePageMeta({
  layout: 'basic', // Use the 'country' layout
});

const route = useRoute();
const ISO3Code = route.params.ISO3;

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const shapeName = getKeyByValue(countries, ISO3Code)

// Get only the colors for the selected country
const landColors = colors[ISO3Code]

const meanColors = Object.fromEntries(
  Object.entries(landColors["total"]).map(
    ([landCover, rgbObject]) => [landCover, reflectanceColorToHex(rgbObject)]
  )
);

// "Pop" key1
const totalMean = meanColors["Total Mean Color"]; // access
delete meanColors["Total Mean Color"];        // delete

const landCovers = Object.keys(meanColors).sort()

const metaTitle = `LandShade - ${shapeName} average colors`;
const metaDescription = `The average colors for ${shapeName} based on 20 years of satellite imagery. This includes data for the following land cover: ${landCovers.join(', ')}.`;

// SEO Meta Configuration
useHead({
  title: metaTitle,
  meta: [
    { 
      name: 'description', 
      content: metaDescription,
    },
    // Open Graph Tags
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription},
    // Twitter Cards
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:description', content: metaDescription }
  ]
});

defineOgImageComponent("ColorSwatch", {title: "Mean Color of " + shapeName, color: { hex: totalMean}})

</script>

<template>
  <div>
    <div class="flex sm:flex-row flex-col justify-between items-start">
      <CountryTitle :title="shapeName" :colors="Object.values(meanColors).slice(0, 3)" />
      <ShapeSelector/>
    </div>
    <div class="flex flex-col sm:flex-row gap-4">
      <ColorSwatch
        :title="'Total Mean Color'"
        :color="{ hex: totalMean}"
        class="w-full aspect-square sm:size-84 mr-1"
      />
      <div class="flex-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      
      <ColorSwatch
        v-for="landCover in landCovers"
        :title="landCover"
        :key="landCover"
        :color="{ hex: meanColors[landCover] }"
        class="w-full aspect-square "
      />
    </div>
    </div>
    
  </div>

<h2 class="text-6xl font-bold my-5 text-gray-900 dark:text-gray-300">Entire year</h2>
<div class="overflow-auto">
  <MonthCategoryGrid :data="landColors['monthly']" />
</div>
</template>