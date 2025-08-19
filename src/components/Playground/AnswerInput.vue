<script setup lang="ts">
import { ref } from 'vue';
import { playKanaAudio } from '../../utils/kana';

const props = defineProps<{
  value: string
  playAudio?: boolean
}>()

const emit = defineEmits<{
  (e: 'correct', value: boolean): void
}>()

const answer = ref('')
const handleEnter = () => {
  if (answer.value.trim() === '') return
  const isCorrect = answer.value.trim().toLowerCase() === props.value.toLowerCase()
  emit('correct', isCorrect)
  answer.value = ''
}

const showHint = ref(false)
const playAudioFlag = ref(false)
const handleTabDown = (event: KeyboardEvent) => {
  event.preventDefault()
  showHint.value = true
  if (props.playAudio && !playAudioFlag.value) {
    playKanaAudio(props.value)
    playAudioFlag.value = true
  }
}
const handleTabUp = (event: KeyboardEvent) => {
  event.preventDefault()
  showHint.value = false
  playAudioFlag.value = false
}
</script>

<template>
  <div class="w-full flex justify-center">
    <input v-model="answer" @keyup.enter="handleEnter" @keydown.tab="handleTabDown" @keyup.tab="handleTabUp"
      :placeholder="showHint ? props.value : ''" type="text" class="w-48 text-5xl text-center 
      py-1 border-b-4 border-gray-300 hover:border-gray-700 outline-0
      focus:outline-0 focus:border-b-4 focus:border-black focus:ring-0" style="font-family: 'Fira Code', monospace;" />
  </div>
</template>
