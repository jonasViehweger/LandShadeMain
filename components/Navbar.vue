<script setup>
import { useRoute } from 'vue-router';

const menuitems = [
  {
    title: "Guess",
    path: "https://guess.landshade.com/",
  },
  {
    title: "Details",
    path: "/details",
  },
];

const open = ref(false);
const route = useRoute();
const isRoot = computed(() => route.path === '/');
</script>

<template>
  <Container>
    <header class="flex flex-col lg:flex-row justify-between items-center my-5">
      <div class="flex w-full lg:w-auto items-center justify-between">
        <a v-if="!isRoot" href="/" class="text-xl text-center sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-green-700">
          LandShade
        </a>
        <div class="block lg:hidden">
          <button @click="open = !open" class="text-gray-800">
            <svg
              fill="currentColor"
              class="w-4 h-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path
                v-show="open"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
              ></path>
              <path
                v-show="!open"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <nav
        class="w-full lg:w-auto mt-2 lg:flex lg:mt-0"
        :class="{ block: open, hidden: !open }"
      >
        <ul class="flex flex-col lg:flex-row lg:gap-3">
          <li v-for="item of menuitems" :key="item.title">
            <a
              :href="item.path"
              class="flex lg:px-3 py-2 text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-500"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </Container>
</template>