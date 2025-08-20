<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePlaygroundStore } from '../../store';
import KanaCard from './KanaCard.vue';
// import Setting from './Setting.vue';
import AnswerInput from './AnswerInput.vue';

const playgroundStore = usePlaygroundStore()

const kana = computed(() => playgroundStore.value)

const handleCorrect = (isCorrect: boolean) => {
  if (isCorrect) playgroundStore.updateCurrentValue()
}

const showHint = ref(false)
const handleHint = (value: boolean) => {
  showHint.value = value
}

const init = () => {
  playgroundStore.updateCurrentValue()
}
init()
</script>

<template>
  <div class="w-full h-full p-2">
    <template v-if="kana">
      <KanaCard :value="kana" @hint="handleHint" class="my-4" />
      <AnswerInput :value="kana.key" :show-hint="showHint" @correct="handleCorrect" @hint="handleHint" play-audio
        class="my-16" />
    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@600&family=Noto+Serif+JP:wght@600&display=swap');
</style>
