<script setup lang="ts">
import { ref } from 'vue';
import router from '../../router';
import { usePlaygroundStore } from '../../store';
import { KanaRange } from '../../utils/kana';

const playgroundStore = usePlaygroundStore()

const handleToSetting = () => {
  router.push({ path: '/setting' })
}

// type
const types = ref([{ key: 'あ', selected: false }, { key: 'ア', selected: false }])
const handleClickType = () => {
  const hiragana = types.value[0].selected
  const katakana = types.value[1].selected
  // h => k, k => false, false => h
  if (hiragana || katakana) {
    // h => k
    if (hiragana) {
      types.value[0].selected = false
      types.value[1].selected = true
      playgroundStore.updateType('katakana')
    }
    // k => all
    if (katakana) {
      types.value[0].selected = false
      types.value[1].selected = false
      playgroundStore.updateType()
    }
  } else {
    // all => h
    types.value[0].selected = true
    types.value[1].selected = false
    playgroundStore.updateType('hiragana')
  }
  playgroundStore.updateCurrentValue()
}

// range
const ranges = ref([{ key: 'あ', selected: false }, { key: 'が', selected: false }, { key: 'きゃ', selected: false }])
const handleClickRange = (item: string) => {
  const index = ranges.value.findIndex(range => range.key === item)
  if (index > -1) {
    ranges.value[index].selected = !ranges.value[index].selected
    playgroundStore.updateRange(ranges.value.filter(range => range.selected).map(range => range.key) as KanaRange[])
    playgroundStore.updateCurrentValue()
  }
}
const handleClearRange = () => {
  ranges.value.forEach(range => range.selected = false)
  playgroundStore.updateRange()
  playgroundStore.updateCurrentValue()
}
</script>

<template>
  <div class="flex justify-between h-10">
    <div class="flex items-center">
      <button @mousedown.prevent @click="handleToSetting"
        class="text-lg text-gray-500 hover:text-gray-900 p-1 border-0 transition-colors">︎☼</button>
    </div>
    <div class="flex justify-center items-center space-x-4" style="font-family: 'Noto Serif JP', serif;">
      <button @mousedown.prevent @click="handleClickType()" class="text-gray-400 p-1 border-0 transition-colors">
        <span :class="{ 'text-black': types[0].selected, 'text-lg': types[0].selected }">︎{{ types[0].key }}</span>
        <span class="text-xs text-gray-500">/</span>
        <span :class="{ 'text-black': types[1].selected, 'text-lg': types[1].selected }">︎{{ types[1].key }}</span>
      </button>
      <span>·</span>
      <button v-for="item in ranges" :key="item.key" @mousedown.prevent @click="handleClickRange(item.key)"
        class="text-gray-400 p-1 border-0 transition-colors">︎
        <span :class="{ 'text-black': item.selected, 'text-lg': item.selected }">{{ item.key }}</span>
      </button>
    </div>
    <div>
      <button @mousedown.prevent @click="handleClearRange"
        class="text-gray-500 hover:text-black p-1 border-0 transition-colors">︎♲</button>
    </div>
  </div>
</template>
