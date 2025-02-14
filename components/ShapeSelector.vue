<template>
<div>
    <label for="shape-select">Select a Shape:</label>
    <multiselect
      id="shape-select"
      v-model="selectedShape"
      :options="uniqueShapeNames"
      placeholder="Search and select..."
    />
    <button @click="navigateToShapeGroup">Go to Shape Group</button>
</div>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Multiselect from 'vue-multiselect';
import { colors } from "@/data/colors"; // Import the static data
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter

const selectedShape = ref(null);
const uniqueShapeNames = computed(() => [...new Set(colors.map((item) => item.shapeName))]);

const router = useRouter(); // Initialize router

const navigateToShapeGroup = () => {
    const shapeGroup = colors.find(item => item.shapeName === selectedShape.value)?.shapeGroup;
    if (shapeGroup) {
        router.push(`/ISO/${shapeGroup}`);
    }
};
</script>