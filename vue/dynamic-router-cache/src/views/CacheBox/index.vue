<template>
  <div>
    <!-- {{ routerPath }} -->
    <el-input v-model="input" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'CacheBox',
})

// const routerPath = computed(() => useRoute().path);

const input = ref('');

</script>

<style lang="scss" scoped>

</style>