<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import router from '../../router';
import { usePlaygroundStore } from '../../store';
import { playKanaAudio } from '../../utils/kana';
import SettingBar from './SettingBar.vue';

const props = defineProps<{
  value: string
  playAudio?: boolean
  showHint?: boolean
}>()
const emit = defineEmits<{
  (e: 'correct', value: boolean): void
  (e: 'hint', value: boolean): void
}>()

// input focus
const isFocused = ref(false)
const inputRef = ref<HTMLInputElement>()
onMounted(() => {
  inputRef.value?.focus()
})
// answer input
const answer = ref('')
const handleEnter = () => {
  if (answer.value.trim() === '') return
  const isCorrect = answer.value.trim().toLowerCase() === props.value.toLowerCase()
  emit('correct', isCorrect)
  answer.value = ''
}

// play audio
const playAudioFlag = ref(false)
const handleTabDown = (event: KeyboardEvent) => {
  event.preventDefault()
  emit('hint', true)
  if (props.playAudio && !playAudioFlag.value) {
    playKanaAudio(props.value)
    playAudioFlag.value = true
  }
}
const handleTabUp = (event: KeyboardEvent) => {
  event.preventDefault()
  emit('hint', false)
  playAudioFlag.value = false
}

// keyboard height detection
const keyboardHeight = ref(0)
const originalHeight = ref(0)
const handleResize = () => {
  const currentHeight = window.visualViewport?.height || window.innerHeight
  if (originalHeight.value === 0) originalHeight.value = window.innerHeight
  const heightDiff = originalHeight.value - currentHeight
  keyboardHeight.value = heightDiff > 100 ? heightDiff : 0
}
onMounted(() => {
  originalHeight.value = window.innerHeight
  window.visualViewport?.addEventListener('resize', handleResize)
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.visualViewport?.removeEventListener('resize', handleResize)
  window.removeEventListener('resize', handleResize)
})

// button handlers
// TODO: need to flag for statistics
const handleHint = () => {
  emit('hint', true)
  setTimeout(() => { inputRef.value?.focus() }, 10)
}
const playgroundStore = usePlaygroundStore()
const handleSkip = () => {
  emit('hint', false)
  answer.value = ''
  playgroundStore.updateCurrentValue()
  setTimeout(() => { inputRef.value?.focus() }, 10)
}
const handleMastered = () => {
  emit('correct', true)
  emit('hint', false)
  answer.value = ''
  playgroundStore.updateCurrentValue()
  setTimeout(() => { inputRef.value?.focus() }, 10)
}
const handleToDoc = () => {
  router.push({ path: '/doc' })
}
</script>

<template>
  <div class="w-full flex justify-center">
    <input ref="inputRef" v-model="answer" @keyup.enter="handleEnter" @keydown.tab="handleTabDown"
      @keyup.tab="handleTabUp" @focus="isFocused = true" @blur="isFocused = false"
      :placeholder="props.showHint ? props.value : ''" type="text" class="w-48 text-5xl text-center 
      py-1 border-b-4 border-gray-300 hover:border-gray-700 outline-0
      focus:outline-0 focus:border-b-4 focus:border-black focus:ring-0" style="font-family: 'Fira Code', monospace;" />
    <!-- <div class="fixed left-0 w-full p-3 transition-all duration-300 ease-in-out" -->
    <div v-show="isFocused" class="fixed left-0 w-full p-3 transition-all duration-300 ease-in-out"
      :style="{ bottom: keyboardHeight + 'px' }" style="font-family: 'Fira Code', monospace;">
      <SettingBar />
      <div class="flex justify-between">
        <div class="flex items-center">
          <object class="w-6 h-6" data="/public/favicon.svg" type="image/svg+xml"></object>
        </div>
        <div class="flex justify-center space-x-4">
          <button @mousedown.prevent @click="handleMastered"
            class="text-sm text-gray-500 hover:text-gray-600 p-1 border-0 transition-colors">︎✓</button>
          <button @mousedown.prevent @click="handleHint"
            class="text-sm text-gray-500 hover:text-gray-600 p-1 border-0 transition-colors">‼︎</button>
          <button @mousedown.prevent @click="handleSkip"
            class="text-sm text-gray-500 hover:text-gray-600 p-1 border-0 transition-colors">→</button>
        </div>
        <div>
          <button @mousedown.prevent @click="handleToDoc" class="w-6 text-center">?</button>
        </div>
      </div>
    </div>
  </div>
</template>
