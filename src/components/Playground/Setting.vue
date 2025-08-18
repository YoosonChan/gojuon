<script setup lang="ts">
import { getHiragana, getKatakana } from '../../utils/kana';

const handleClickHiragana = () => {
  const hiragana = getHiragana();
  console.log(hiragana);
};

const handleClickKatakana = () => {
  const katakana = getKatakana();
  console.log(katakana);
};
</script>

<template>
  <div class="w-full p-2 box-border border rounded-md">
    <div class="space-x-1">
      <span @click="handleClickHiragana()" class="cursor-pointer">平</span>
      <span @click="handleClickKatakana()" class="cursor-pointer">片</span>
    </div>
  </div>
</template>
