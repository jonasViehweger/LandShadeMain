<template>
    <!-- Header Row - Months -->
    <div class="grid grid-cols-[160px_repeat(12,minmax(3em,8em))] gap-0 ">
      <div></div> <!-- Empty corner cell -->
      <div 
        v-for="month in 12" 
        :key="month"
        class="text-s text-center p-1 h-12 flex items-center justify-center"
      >
        {{ getMonthName(month) }}
      </div>
    </div>

    <!-- Data Rows -->
    <div 
      v-for="category in sortedCategories" 
      :key="category"
      class="grid grid-cols-[160px_repeat(12,minmax(3em,8em))] gap-0"
    >
      <!-- Row Header -->
      <div class="text-s flex mr-3 items-center justify-end align-middle">
        {{ category }}
      </div>

      <!-- Color Cells -->
      <div
        v-for="month in 12"
        :key="month"
        class="min-h-12 min-w-6 relative group flex items-center justify-center"
        :style="getCellStyle(category, month)"
      >
      <p class="bg-inherit bg-clip-text text-transparent invert grayscale contrast-[500] hidden group-hover:block">{{ getCellColor(category, month) }}</p>
          
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    },
  
    computed: {
      sortedCategories() {
        return [...new Set(this.data.map(item => item.landCover))].sort();
      },
  
      colorMap() {
        const map = {};
        this.data.forEach(item => {
          if (!map[item.landCover]) map[item.landCover] = {};
          map[item.landCover][item.month] = {
            red: item.red,
            green: item.green,
            blue: item.blue
          };
        });
        return map;
      }
    },
  
    methods: {
      getMonthName(monthNumber) {
        const date = new Date(2000, monthNumber - 1, 1);
        return date.toLocaleString('default', { month: 'short' });
      },
  
      rgbToHex(r, g, b) {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
      },
  
      getCellStyle(category, month) {
        const color = this.colorMap[category]?.[month];
        return color 
          ? { backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`, color: 'white'} 
          : { backgroundColor: '#f3f4f600', color: '#f3f4f600' };
      },
  
      getCellColor(category, month) {
        const color = this.colorMap[category]?.[month];
        return color 
          ? this.rgbToHex(color.red, color.green, color.blue) 
          : '';
      }
    }
  };
  </script>