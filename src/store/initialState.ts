import { initAsyncParticle } from './utils';
import { Profile, User } from '../types/types';

export const initialAuthState = {
  isAuth: { register: false, login: true },
  isLogin: false,
  isLoginChecked: false,

  profile: initAsyncParticle<Profile>(),
};

export const initialUsersState = {
  allUsers: initAsyncParticle<User[]>(),
};
