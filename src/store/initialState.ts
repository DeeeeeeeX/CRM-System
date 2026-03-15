import { initAsyncParticle } from './utils';
import { Profile } from '../types/types';

export const initialAuthState = {
  isAuth: { register: false, login: true },
  isLogin: false,
  isLoginChecked: false,

  profile: initAsyncParticle<Profile>(),
};