<script setup lang="ts">
import router from '../router';
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="p-8 text-sm text-gray-700" style="font-family: 'Fira Code', monospace;">
      <div class="mb-2">
        <strong class="underline">✓</strong>
        <span>: Mark as Mastered</span>
      </div>
      <div class="mb-2">
        <strong class="underline">‼︎/⇥</strong>
        <span>: Show Hint</span>
      </div>
      <div class="mb-2">
        <strong class="underline">→</strong>
        <span>: Skip</span>
      </div>
    </div>
    <div class="text-lg text-gray-700 cursor-pointer" @click="router.push({ path: '/' })">×</div>
  </div>
</template>
