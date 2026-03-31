import { initAsyncParticle } from './utils';
import { Profile } from '../types/types';

export const initialAuthState = {
  isLogin: false,
  isLoginChecked: false,

  profile: initAsyncParticle<Profile>(),
};
