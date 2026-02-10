import { ValidatorFunc } from '../types/types';

export const validator: ValidatorFunc = (text) => {
  if (text.trim().length < 2) {
    return 'Количество символов должно быть более 2';
  } else if (text.trim().length > 64) {
    return 'Количество символов должно быть менее 64';
  }
  return '';
};
