<script setup lang="ts">
import { Kana } from '../../types';
import { playKanaAudio } from '../../utils/kana';

const props = defineProps<{
  value: Kana
}>()

const emit = defineEmits<{
  (e: 'hint', value: boolean): void
}>()

const handleStart = (kana: Kana) => {
  emit('hint', true)
  playKanaAudio(kana.key)
}
const handleEnd = () => {
  emit('hint', false)
}

</script>

<template>
  <div class="w-full flex justify-center">
    <div @mousedown="handleStart(props.value)" @mouseup="handleEnd" @mouseleave="handleEnd"
      @touchstart="handleStart(props.value)" @touchend="handleEnd" @touchcancel="handleEnd"
      class="p-5 border rounded-md mt-4 text-center text-7xl cursor-pointer select-none touch-none"
      style="font-family: 'Noto Serif JP', serif;">
      {{ props.value.value }}
    </div>
  </div>
</template>
