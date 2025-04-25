<template>
<div class="sm:w-100 mb-5 w-full">
    <label for="shape-select">Select a Country:</label>
    <multiselect
        id="shape-select"
        v-model="selectedShape"
        :options="uniqueShapeNames"
        placeholder="Search and select..."
    />
</div>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Multiselect from 'vue-multiselect';
import countries from "@/assets/countries.json";
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const selectedShape = ref(null);
const router = useRouter();

const uniqueShapeNames = computed(() => Object.keys(countries));

const navigateToShapeGroup = () => {
    const shapeGroup = countries[selectedShape.value];
    if (shapeGroup) {
        router.push(`/ISO/${shapeGroup}`);
    }
};

// Watch for changes and navigate automatically
watch(selectedShape, (newValue) => {
    if (newValue) navigateToShapeGroup();
});
</script>