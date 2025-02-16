<template>
<div class="w-100">
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
import { colors } from "@/data/colors";
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const selectedShape = ref(null);
const router = useRouter();

const uniqueShapeNames = computed(() => [...new Set(colors.map((item) => item.shapeName))].sort());

const navigateToShapeGroup = () => {
    const shapeGroup = colors.find(item => item.shapeName === selectedShape.value)?.shapeGroup;
    if (shapeGroup) {
        router.push(`/ISO/${shapeGroup}`);
    }
};

// Watch for changes and navigate automatically
watch(selectedShape, (newValue) => {
    if (newValue) navigateToShapeGroup();
});
</script>