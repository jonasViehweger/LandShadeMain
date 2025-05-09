<script setup>
definePageMeta({
  layout: "basic",
});
</script>

<template>
<div class="p-6 max-w-3xl mx-auto">
  <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">Details</h1>
  
  <p class="mb-4 text-gray-300">
    <strong>TLDR:</strong> The colors are recorded by the MODIS sensors on the Terra and Aqua satellites. This is an average over 20 years of data.
  </p>

  <p class="font-semibold mb-2">A few caveats:</p>
    
  <h2 class="mt-8 text-4xl font-extrabold">1. Colors are complicated</h2>
  <p class="mt-2 text-gray-300">
    What the satellites record is raw reflectance. This is in a certain spectral band (like red, green and blue) how much of the suns light is reflected off a single area of land from 0-100%. 
    Our eyes are also sensors which are not at all compatible with scientific sensors used on satellites. So to get from actual red, green and blue reflectance values that we can display on a computer screen and which are close to what a human would see if they were shot into orbit we need to use a conversion formula.
  </p>
  <p class="mt-2 text-gray-300">
    I used the formula which was used to compute 
    <a href="https://earthobservatory.nasa.gov/features/BlueMarble" class="text-blue-600 underline hover:text-blue-800">NASA's Blue Marble composites</a>. 
    However there's more scientific approaches which would actually map the spectral response of the MODIS sensor to the CIE XYZ color space, which would then allow for a pretty exact conversion to what humans would see 
    (If you love details, see 
    <a href="https://doi.org/10.1016/j.rse.2019.01.036" class="text-blue-600 underline hover:text-blue-800">this article</a> 
    for more info). That takes a lot of work though so I leave it up to a motivated reader.
  </p>


  <h2 class="mt-8 text-4xl font-extrabold">2. Earth is complicated</h2>
  <p class="mt-2 text-gray-300">
    To get the data I present here we need to also have a map of the entire earth for what land cover is where (and when!). I've used 
    <a href="https://developers.google.com/earth-engine/datasets/catalog/MODIS_061_MCD12Q1" class="text-blue-600 underline hover:text-blue-800">MCD12Q1.061</a>, 
    in particular the Annual International Geosphere-Biosphere Programme (IGBP) classification. This is a classification derived from the raw satellite data that I also used to collect the colors.
  </p>
  <p class="mt-2 text-gray-300">
    This classification and the reflectance data I'm using is at 500m resolution, so everything gets a bit muddled. That's why water areas and urban areas look the way they do. They are mixed up with lots of other stuff. Also the Land Cover classification is anything but perfect.
  </p>


  <h2 class="mt-8 text-4xl font-extrabold">3. No you can't get Antarctica</h2>
  <p class="mt-2 text-gray-300">
    I didn't manage to get data for Antarctica. Sorry. Spatial geometries often don't like crossing poles or the date line. For Antarctica they do both and I couldn't be bothered to handle those issues just to get 50 shades of white.
  </p>
  <p class="mt-2 text-gray-300">
    Also this is only land areas, basically everything which falls into the country borders which are made available by 
    <a href="https://developers.google.com/earth-engine/datasets/catalog/WM_geoLab_geoBoundaries_600_ADM0" class="text-blue-600 underline hover:text-blue-800">geoBoundaries</a>. 
    This also means that disputed border regions are removed. However all of the raw data for the border regions is available. So if you want to look at 
    <a href="https://github.com/jonasViehweger/LandShade/blob/main/data/LandColor.csv" class="text-blue-600 underline hover:text-blue-800">Western Sahara</a> for example be my guest.
  </p>


  <h2 class="mt-8 text-4xl font-extrabold">4. Let it snow</h2>
  <p class="mt-2 text-gray-300">
    I left in snow. For many countries and the global averages this is really noticeable, I don't know if it was the best decision, but I think it makes sense. If you're looking at Canada in winter everything would be snowy. So the average forest color for Canada should reflect that.
  </p>

  <h2 class="mt-8 text-4xl font-extrabold">5. So much data</h2>
  <p class="mt-2 text-gray-300">
    Computing averages over 20 years for the entire world isn't an easy feat. To do it I used Google Earth Engine, which is free for scientific and non-commercial use. At this scale it's also almost inevitable that I made some mistakes, if you find any, please do leave an issue or a pull request on github.
  </p>
</div>

</template>