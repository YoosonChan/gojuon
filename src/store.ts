import { defineStore } from 'pinia'
import { Kana } from './types'
import { getKana } from './utils/kana'

export const usePlaygroundStore = defineStore('playground', {
  state: () => ({
    setting: {},
    value: {} as Kana,
  }),
  getters: {
    pool: () => {
      return getKana()
    }
  },
  actions: {
    updateCurrentValue() {
      const pool = this.pool
      const index = Math.floor(Math.random() * pool.length);
      return this.value = pool[index];
    }
  }
})