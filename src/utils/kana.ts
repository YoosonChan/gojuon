import kana from './data.json';

export const getKana = () => {
  return [...getHiragana(), ...getKatakana()]
}

export const getHiragana = () => {
  return kana.map(({ key, value }) => ({ key, value: value.split('/')[0] }));
};

export const getKatakana = () => {
  return kana.map(({ key, value }) => ({ key, value: value.split('/')[1] }));
};

export const playKanaAudio = (key: string) => {
  try {
    const audio = new Audio(`/src/audio/${key}.mp3`)
    audio.play().catch(error => { console.error('play failed:', error) })
  } catch (error) {
    console.error('load audio failed:', error)
  }
}