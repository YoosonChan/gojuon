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
