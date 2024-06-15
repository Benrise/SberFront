import { createContext, useContext } from 'react';
import { UserModel } from '@/entities/user';
import { AuthModel } from '@/entities/auth';

class RootStore {
  userStore: UserModel.UserStore;
  authStore: AuthModel.AuthStore;

  constructor() {
    this.userStore = UserModel.userStore;
    this.authStore = AuthModel.authStore;
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const useRootStore = () => useContext(RootStoreContext);

export default rootStore;