import { Kana } from '../types';
import kana from './data.json';

export type KanaType = 'hiragana' | 'katakana'
export type KanaRange = 'あ' | 'が' | 'きゃ'

const kanaMap = new Map<KanaRange, Kana[]>([
  ['あ', kana[0]],
  ['が', kana[1]],
  ['きゃ', kana[2]]
])

export const getAllKana = (range?: KanaRange[]) => {
  return [...getKana('hiragana', range), ...getKana('katakana', range)]
}

export const getKana = (type?: KanaType, range?: KanaRange[]) => {
  const types = ['hiragana', 'katakana']
  let _kana: Kana[][] = kana
  const _range = [...new Set(range)]
  if (_range.length > 0) _kana = _range.map(key => kanaMap.get(key)) as Kana[][]
  const index = types.findIndex(_type => _type === type) > 0 ? 1 : 0
  return _kana.flat().map(({ key, value }) => ({ key, value: value.split('/')[index] }));
}

export const playKanaAudio = (key: string) => {
  try {
    const url = new URL(`/src/audio/${key}.mp3`, import.meta.url).href
    const audio = new Audio(url)
    audio.play().catch(error => { console.error('play failed:', error) })
  } catch (error) {
    console.error('load audio failed:', error)
  }
}