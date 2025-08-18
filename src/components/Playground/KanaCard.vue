<script setup lang="ts">
import { usePlaygroundStore } from '../../store';
const playground = usePlaygroundStore()
const kana = playground.updateCurrentValue()
</script>

<template>
  <div class="w-full flex justify-center">
    <div class=" p-5 border rounded-md mt-4 text-center text-5xl cursor-pointer">
      {{ kana.value }}
    </div>
  </div>
</template>
