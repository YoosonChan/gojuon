<script setup lang="ts">
import { Kana } from '../../types';
import { playKanaAudio } from '../../utils/kana';

const props = defineProps<{
  value: Kana
}>()

const handleClick = (kana: Kana) => {
  playKanaAudio(kana.key)
}

</script>

<template>
  <div class="w-full flex justify-center">
    <div @click="handleClick(props.value)" class="p-5 border rounded-md mt-4 text-center text-7xl cursor-pointer"
      style="font-family: 'Noto Serif JP', serif;">
      {{ props.value.value }}
    </div>
  </div>
</template>
