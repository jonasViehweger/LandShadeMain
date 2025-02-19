<script setup>
definePageMeta({
  layout: "basic",
});

const metaTitle = "LandShade - Average colors for countries";
const metaDescription = "Explore the average colors for countries around the world based on 20 years of satellite imagery.";

// SEO Meta Configuration
useHead({
  title: metaTitle,
  meta: [
    { 
      name: 'description', 
      content: metaDescription
    },
    // Open Graph Tags
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },
    // Twitter Cards
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:description', content: metaDescription }
  ]
});
</script>

<template>
  <Container class="flex flex-col items-center justify-center">
  <h1 class="text-6xl text-center sm:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-green-700">
    LandShade
  </h1>
  <ShapeSelector/>
</Container>
</template>