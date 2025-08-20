import { defineStore } from 'pinia'
import { Kana } from './types'
import { getAllKana, getKana, KanaRange, KanaType } from './utils/kana'

interface PlaygroundState {
  setting: {}
  type: KanaType
  range: KanaRange[]
  value: Kana
}

export const usePlaygroundStore = defineStore('playground', {
  state: (): Partial<PlaygroundState> => ({}),
  getters: {
    pool: (state) => {
      let result = getAllKana(state.range)
      if (state.type) result = getKana(state.type, state.range)
      return result
    }
  },
  actions: {
    updateCurrentValue() {
      const pool = this.pool
      const index = Math.floor(Math.random() * pool.length);
      return this.value = pool[index];
    },
    updateType(type?: KanaType) {
      this.type = type
    },
    updateRange(range?: KanaRange[]) {
      this.range = range
    }
  }
})