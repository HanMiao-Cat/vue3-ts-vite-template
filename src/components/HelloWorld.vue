<template>
  <div>{{ msg }}</div>
  <a-button type="primary">按钮</a-button>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
