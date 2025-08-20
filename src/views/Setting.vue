<script setup lang="ts">
import router from '../router';
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="text-lg text-gray-700 cursor-pointer" @click="router.push({ path: '/' })">×</div>
  </div>
</template>