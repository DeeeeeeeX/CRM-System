import { initAsyncParticle } from './utils';
import { Profile, User, UserFilters } from '../types/types';

export const initialAuthState = {
  isAuth: { register: false, login: true },
  isLogin: false,
  isLoginChecked: false,

  profile: initAsyncParticle<Profile>(),
};

export const initialUsersState = {
  allUsers: initAsyncParticle<User[]>(),
  filters: {
    search: undefined,
    sortBy: undefined,
    sortOrder: undefined,
    isBlocked: undefined,
    limit: 20,
    page: 1,
  } as UserFilters,
};
